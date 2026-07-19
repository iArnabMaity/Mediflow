/**
 * MedicalRecordsPage
 * MediFlow - Medical records management with view, download, upload, and filtering
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { SearchPill } from "@/components/Input";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationContext } from "@/context/NotificationContext";
import { formatDate } from "@/utils/helpers";
import Loading from "@/components/Loading";

interface MedicalRecord {
  id: string;
  title: string;
  type: "prescription" | "diagnosis" | "lab" | "imaging" | "vaccination" | "other";
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
  const { addNotification } = useNotificationContext();

  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      title: "Blood Test Report",
      type: "lab",
      date: "2024-01-15",
      provider: "Apollo Diagnostics",
      status: "available",
      fileSize: "2.4 MB",
      description: "Complete blood count and biochemistry analysis",
    },
    {
      id: "2",
      title: "X-Ray Chest",
      type: "imaging",
      date: "2024-01-10",
      provider: "Max Healthcare",
      status: "available",
      fileSize: "5.1 MB",
      description: "Routine chest X-ray",
    },
    {
      id: "3",
      title: "Prescription - Antibiotics",
      type: "prescription",
      date: "2024-01-20",
      provider: "Dr. Sharma",
      status: "available",
      fileSize: "0.5 MB",
      description: "Antibiotic course for infection treatment",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const recordTypes = ["all", "prescription", "diagnosis", "lab", "imaging", "vaccination"];

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesType = filterType === "all" || record.type === filterType;
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleUpload = () => {
    setIsUploading(true);
    addNotification({ type: "info", message: "Upload feature coming soon!" });
    setIsUploading(false);
  };

  const handleDownload = (recordId: string, title: string) => {
    addNotification({ type: "success", message: `Downloading ${title}...` });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "prescription":
        return "success";
      case "lab":
        return "warning";
      case "imaging":
        return "info";
      case "diagnosis":
        return "error";
      case "vaccination":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-heading-lg font-bold text-ink">Medical Records</h1>
            <p className="text-body-md text-slate mt-2">
              View, download, and upload your medical documents
            </p>
          </div>
          <Button variant="primary" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : "+ Upload Record"}
          </Button>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Search and Filter */}
            <Card variant="base" padding="lg">
              <div className="space-y-4">
                <SearchPill
                  placeholder="Search records, providers..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
                <div className="flex gap-2 flex-wrap">
                  {recordTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
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
            {filteredRecords.length > 0 ? (
              <div className="grid gap-4">
                <h2 className="text-heading-sm font-bold text-ink">Records ({filteredRecords.length})</h2>
                {filteredRecords.map((record) => (
                  <Card key={record.id} variant="base" padding="lg" className="hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-card-title font-semibold text-ink">{record.title}</h3>
                          <Badge variant={getTypeColor(record.type)} size="sm">
                            {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-body-sm text-slate">{record.provider}</p>
                        {record.description && (
                          <p className="text-body-sm text-charcoal mt-2">{record.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-caption text-slate">
                          <span>📅 {formatDate(record.date)}</span>
                          {record.fileSize && <span>📦 {record.fileSize}</span>}
                          <Badge variant="success" size="sm">
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDownload(record.id, record.title)}
                        >
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card variant="feature" padding="lg" className="text-center">
                <p className="text-body-md text-slate">
                  No records found matching your search
                </p>
                <Button variant="secondary" size="sm" className="mt-4" onClick={handleUpload}>
                  Upload Your First Record
                </Button>
              </Card>
            )}

            {/* Upload Info Card */}
            <Card variant="feature" padding="lg" className="bg-gradient-to-br from-blue-50 to-primary/5">
              <h3 className="text-card-title font-bold text-ink mb-2">💾 Secure Storage</h3>
              <p className="text-body-sm text-slate">
                All your medical records are encrypted and securely stored. You control who can access them.
              </p>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
