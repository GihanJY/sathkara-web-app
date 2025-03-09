"use client";
import { useEffect, useState } from "react";
import db from "@/lib/firestore";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

// Define interfaces for donors
interface Donor {
  id: string;
  name: string;
  phoneNum: string;
}

export default function Dashboard() {
  const [hospitalId, setHospitalId] = useState<string | null>(null);
  const [hospitalName, setHospitalName] = useState("");
  const [organDonorsCount, setOrganDonorsCount] = useState(0);
  const [bloodDonorsCount, setBloodDonorsCount] = useState(0);
  const [organDonors, setOrganDonors] = useState<Donor[]>([]);
  const [bloodDonors, setBloodDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedHospitalId = localStorage.getItem("hospitalId");
    if (storedHospitalId) {
      setHospitalId(storedHospitalId);
    } else {
      setError("Hospital ID not found. Please log in again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchHospitalData() {
      if (!hospitalId) return;
      try {
        const hospitalDocRef = doc(db, "Hospital_Details", hospitalId);
        const hospitalDocSnap = await getDoc(hospitalDocRef);

        if (!hospitalDocSnap.exists()) {
          setError("Hospital not found.");
          setLoading(false);
          return;
        }

        const hospitalData = hospitalDocSnap.data();
        setHospitalName(hospitalData.Name);

        // Fetch Organ Donors
        const organDonorsQuery = query(
          collection(db, "Organ_Donar_Details"),
          where("hospital", "==", hospitalData.Name)
        );
        const organDonorsSnapshot = await getDocs(organDonorsQuery);
        setOrganDonorsCount(organDonorsSnapshot.size);
        setOrganDonors(organDonorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donor)));

        // Fetch Blood Donors
        const bloodDonorsQuery = query(
          collection(db, "Blood Donar Details"),
          where("hospital", "==", hospitalData.Name)
        );
        const bloodDonorsSnapshot = await getDocs(bloodDonorsQuery);
        setBloodDonorsCount(bloodDonorsSnapshot.size);
        setBloodDonors(bloodDonorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donor)));
      } catch (error) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }
    fetchHospitalData();
  }, [hospitalId]);

  if (loading) return <div className="h-full bg-white p-6 shadow">Loading...</div>;
  if (error) return <div className="h-full bg-red-100 p-6 shadow text-red-600">{error}</div>;

  return (
    <div className="h-full bg-white p-6 shadow">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Welcome to {hospitalName}'s dashboard!</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800">Organ Donors</h2>
          <p className="text-3xl font-bold text-blue-800">{organDonorsCount}</p>
        </div>
        <div className="p-6 bg-red-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-red-800">Blood Donors</h2>
          <p className="text-3xl font-bold text-red-800">{bloodDonorsCount}</p>
        </div>
      </div>

      {/* Organ Donors Table */}
      <h2 className="text-xl font-semibold text-blue-800 mt-6">Organ Donors</h2>
      <table className="w-full bg-blue-50 rounded-lg shadow-sm mt-2">
        <thead>
          <tr className="bg-blue-200">
            <th className="p-2 text-blue-950">ID</th>
            <th className="p-2 text-blue-950">Name</th>
            <th className="p-2 text-blue-950">Phone</th>
          </tr>
        </thead>
        <tbody>
          {organDonors.map((donor) => (
            <tr key={donor.id} className="border-t">
              <td className="p-2 text-black">{donor.id}</td>
              <td className="p-2 text-black">{donor.name}</td>
              <td className="p-2 text-black">{donor.phoneNum}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Blood Donors Table */}
      <h2 className="text-xl font-semibold text-red-800 mt-6">Blood Donors</h2>
      <table className="w-full bg-red-50 rounded-lg shadow-sm mt-2">
        <thead>
          <tr className="bg-red-200">
            <th className="p-2 text-red-950">ID</th>
            <th className="p-2 text-red-950">Name</th>
            <th className="p-2 text-red-950">Phone</th>
          </tr>
        </thead>
        <tbody>
          {bloodDonors.map((donor) => (
            <tr key={donor.id} className="border-t">
              <td className="p-2 text-black">{donor.id}</td>
              <td className="p-2 text-black">{donor.name}</td>
              <td className="p-2 text-black">{donor.phoneNum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
