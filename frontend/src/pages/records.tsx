/**
 * MedicalRecordsPage
 * MediFlow - Medical records management with view, download, upload, and filtering
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/Card";
import Button from "@/components/Button";
import Input, { SearchPill } from "@/components/Input";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { useNotification } from "@/context/NotificationContext";
import { recordService } from "@/services/api";
import { formatDate } from "@/utils/helpers";
import Loading from "@/components/Loading";

interface MedicalRecord {
  id: string;
  title: string;
  type: "prescription" | "diagnosis" | "lab" | "imaging" | "vaccination";
  date: string;
  provider: string;
  status: "available" | "pending" | "archived";
  fileSize?: string;
  fileUrl?: string;
  description?: string;
}

export default function MedicalRecordsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const recordTypes = [
    "all",
    "prescription",
    "diagnosis",
    "lab",
    "imaging",
    "vaccination",
  ];

  const typeColors: Record<string, string> = {
    prescription: "bg-blue-100 text-blue-800",
    diagnosis: "bg-purple-100 text-purple-800",
    lab: "bg-green-100 text-green-800",
    imaging: "bg-orange-100 text-orange-800",
    vaccination: "bg-pink-100 text-pink-800",
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch records
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        const response = await recordService.list({ limit: 100 });
        setRecords(response.data || []);
      } catch (error) {
        console.error("Failed to fetch records:", error);
        showNotification("Failed to load medical records", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchRecords();
    }
  }, [isAuthenticated, showNotification]);

  // Filter records based on type and search
  useEffect(() => {
    let filtered = records;

    if (filterType !== "all") {
      filtered = filtered.filter((record) => record.type === filterType);
    }

    if (debouncedSearch) {
      filtered = filtered.filter(
        (record) =>
          record.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          record.provider.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    setFilteredRecords(filtered);
  }, [records, filterType, debouncedSearch]);

  const handleDownload = async (recordId: string, title: string) => {
    try {
      await recordService.download(recordId);
      showNotification(`Downloaded: ${title}`, "success");
    } catch (error) {
      showNotification("Failed to download record", "error");
    }
  };

  const handleDelete = async (recordId: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await recordService.delete(recordId);
        setRecords(records.filter((r) => r.id !== recordId));
        showNotification("Record deleted successfully", "success");
      } catch (error) {
        showNotification("Failed to delete record", "error");
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showNotification("File size must be less than 10MB", "error");
      return;
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      showNotification("Only PDF, JPG, and PNG files are allowed", "error");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("type", "custom");

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await recordService.upload(formData);
      clearInterval(progressInterval);
      setUploadProgress(100);

      setRecords([response.data, ...records]);
      showNotification("Record uploaded successfully", "success");
    } catch (error) {
      showNotification("Failed to upload record", "error");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      event.target.value = "";
    }
  };

  if (!isAuthenticated) {
    return <Loading />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
            <p className="mt-1 text-gray-600">
              View, manage, and organize your medical documents
            </p>
          </div>
          <div className="flex gap-3">
            <label htmlFor="file-upload">
              <Button
                variant="secondary"
                onClick={() => {
                  document.getElementById("file-upload")?.click();
                }}
                disabled={isUploading}
              >
                {isUploading ? `Uploading... ${uploadProgress}%` : "Upload Record"}
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <SearchPill
            placeholder="Search by title or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            {recordTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterType === type
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Records Grid */}
        {isLoading ? (
          <Loading />
        ) : filteredRecords.length === 0 ? (
          <Card>
            <CardBody className="py-12 text-center">
              <p className="text-gray-500">No medical records found</p>
              <p className="text-sm text-gray-400 mt-2">
                {searchQuery || filterType !== "all"
                  ? "Try adjusting your filters"
                  : "Upload your first medical record"}
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardBody className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={record.type === "prescription" ? "success" : "info"}
                        className={typeColors[record.type]}
                      >
                        {record.type}
                      </Badge>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {record.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {record.provider} • {formatDate(record.date)}
                    </p>
                    {record.description && (
                      <p className="text-sm text-gray-700 mt-2">
                        {record.description}
                      </p>
                    )}
                    {record.fileSize && (
                      <p className="text-xs text-gray-500 mt-1">
                        File size: {record.fileSize}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(record.id, record.title)}
                    >
                      Download
                    </Button>
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
      title: "Knee Arthroscopy Report",
      type: "procedure",
      date: "Sep 15, 2024",
      provider: "Medical Center Surgery",
      status: "available",
      fileSize: "4.5 MB",
      details: "Arthroscopic examination and minor repairs",
    },
  ];

  const filteredRecords = records.filter((record) => {
    const matchesType = filterType === "all" || record.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      prescription: "💊",
      diagnosis: "📋",
      lab: "🧪",
      imaging: "🖼️",
      vaccination: "💉",
      procedure: "🏥",
      summary: "📄",
    };
    return icons[type] || "📄";
  };

  const getTypeBadgeVariant = (type: string) => {
    const variants: Record<string, any> = {
      prescription: "coral",
      diagnosis: "info",
      lab: "teal",
      imaging: "blue",
      vaccination: "success",
      procedure: "purple",
      summary: "default",
    };
    return variants[type] || "default";
  };

  return (
    <DashboardLayout userName="John Doe" userRole="patient">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-heading-lg font-bold text-ink">Medical Records</h1>
          <Button variant="primary" size="md">
            + Upload Record
          </Button>
        </div>

        {/* Search and Filter */}
        <Card variant="base" padding="lg">
          <div className="space-y-4">
            <SearchPill
              placeholder="Search records, providers, test names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap overflow-x-auto pb-2">
              {recordTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-full text-body-sm font-medium whitespace-nowrap transition-colors ${
                    filterType === type
                      ? "bg-primary text-white"
                      : "bg-surface text-charcoal hover:bg-hairline"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Records List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading-sm font-bold text-ink">
              {filteredRecords.length} Record{filteredRecords.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-body-sm text-slate">
              {filterType !== "all" &&
                filteredRecords.length > 0 &&
                `Showing ${filterType} records`}
            </p>
          </div>

          <div className="space-y-4">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <Card
                  key={record.id}
                  variant="base"
                  padding="lg"
                  className="hover:shadow-elevation-2 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-4xl flex-shrink-0">{getTypeIcon(record.type)}</div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-card-title font-semibold text-ink">
                          {record.title}
                        </h3>
                        <Badge
                          variant={getTypeBadgeVariant(record.type)}
                          size="sm"
                        >
                          {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                        </Badge>
                      </div>

                      <p className="text-body-sm text-slate mb-1">
                        📅 {record.date} • 🏥 {record.provider}
                      </p>

                      {record.testResults && (
                        <p className="text-body-sm text-success-text mb-2">
                          ✓ {record.testResults}
                        </p>
                      )}

                      {record.details && (
                        <p className="text-body-sm text-charcoal mb-2">{record.details}</p>
                      )}

                      <p className="text-caption text-steel">
                        File size: {record.fileSize}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        Share
                      </Button>
                    </div>
                  </div>

                  {record.status === "active" && (
                    <div className="mt-4 pt-4 border-t border-hairline">
                      <Badge variant="success" size="sm">
                        ✓ Active - Refillable
                      </Badge>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <Card variant="feature" padding="lg" className="text-center">
                <p className="text-body-md text-slate">No records found matching your search</p>
              </Card>
            )}
          </div>
        </div>

        {/* Upload Card */}
        <Card variant="feature" padding="lg" className="bg-gradient-to-br from-blue/5 to-primary/5 border-blue/20">
          <CardHeader>
            <h3 className="text-card-title font-bold text-ink">Upload Your Own Records</h3>
          </CardHeader>
          <CardBody>
            <p className="text-body-sm text-slate mb-4">
              Add records from other providers that aren't automatically synced
            </p>
            <div className="border-2 border-dashed border-hairline rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <p className="text-body-md font-semibold text-ink mb-2">📁 Drag files here</p>
              <p className="text-body-sm text-slate">or click to browse</p>
              <p className="text-caption text-steel mt-2">
                Supports PDF, JPG, PNG (Max 25 MB per file)
              </p>
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="primary" size="md">
              Choose Files
            </Button>
          </CardFooter>
        </Card>

        {/* Document Organization Info */}
        <Card variant="base" padding="lg">
          <h3 className="text-card-title font-bold text-ink mb-4">📚 Record Organization Tips</h3>
          <ul className="space-y-2 text-body-sm text-charcoal">
            <li>✓ Keep records organized by type for easy access</li>
            <li>✓ Share specific records with providers who need them</li>
            <li>✓ Download your complete health summary anytime</li>
            <li>✓ Enable automatic syncing from your healthcare providers</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
