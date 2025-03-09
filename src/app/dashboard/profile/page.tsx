"use client";
import { useEffect, useState } from "react";
import db from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";

type Hospital = {
  id?: string;
  Name: string;
  Email: string;
  Address: string;
  Telephone: string;
};

export default function Profile() {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHospital() {
      try {
        // Retrieve hospitalId from Local Storage
        const hospitalId = localStorage.getItem("hospitalId");

        if (!hospitalId) {
          setError("Hospital ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        console.log(`Fetching hospital data for ID: ${hospitalId}`);

        // Fetch the hospital document using the hospitalId
        const hospitalDocRef = doc(db, "Hospital_Details", hospitalId);
        const hospitalDocSnap = await getDoc(hospitalDocRef);

        if (!hospitalDocSnap.exists()) {
          setError("Hospital not found.");
          setLoading(false);
          return;
        }

        const hospitalData = hospitalDocSnap.data() as Hospital;
        setHospital({ ...hospitalData, id: hospitalDocSnap.id });
      } catch (error) {
        console.error("Error fetching hospital:", error);
        setError("Failed to load hospital data.");
      } finally {
        setLoading(false);
      }
    }

    fetchHospital();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full h-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Hospital Profile</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : hospital ? (
          <div className="space-y-6">
            {/* Basic Details */}
            <h2 className="mt-10 text-xl font-semibold text-gray-800 border-b pb-2">Basic Details</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 font-semibold">Hospital Name</p>
                <p className="text-gray-800">{hospital.Name}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Email</p>
                <p className="text-gray-800">{hospital.Email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Telephone</p>
                <p className="text-gray-800">{hospital.Telephone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-600 font-semibold">Address</p>
                <p className="text-gray-800">{hospital.Address}</p>
              </div>
            </div>

            {/* Terms and Conditions Agreement */}
            <div className="mt-30 p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700">
                This hospital has agreed to all the{" "}
                <span className="text-blue-600 font-semibold">Terms and Conditions</span> and{" "}
                <span className="text-blue-600 font-semibold">Privacy Policies</span>.
              </p>
              <div className="flex items-center mt-2">
                <input type="checkbox" checked disabled className="w-5 h-5 text-blue-600" />
                <span className="ml-2 text-gray-700">Agreed</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No hospital data found.</p>
        )}
      </div>
    </div>
  );
}