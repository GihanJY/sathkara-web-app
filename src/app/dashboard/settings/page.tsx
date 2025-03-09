"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Settings() {
  const [organAvailability, setOrganAvailability] = useState(true);
  const [donorMatches, setDonorMatches] = useState(true);
  const [hospitalNotifications, setHospitalNotifications] = useState({
    newDonorRegistration: true,
    patientWaitingListUpdate: false,
    organTransportStatus: true,
    emergencyAlerts: true,
    systemUpdates: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-full mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="mb-5 text-2xl font-semibold text-gray-900">Notification Settings</h1>
        <p className="text-gray-600">Manage notifications for organ donation updates.</p>

        {/* Email Notifications */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Email notifications</h2>
          <div className="mt-4 space-y-4">
            {/* Organ Availability */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Organ Availability Alerts</p>
                <p className="text-gray-600 text-sm">Get notified when a matching organ becomes available.</p>
              </div>
              <Switch
                checked={organAvailability}
                onChange={setOrganAvailability}
                className={`${
                  organAvailability ? "bg-blue-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    organAvailability ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>

            {/* Donor Matches */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Donor Match Notifications</p>
                <p className="text-gray-600 text-sm">Get updates when a new donor matches a recipient.</p>
              </div>
              <Switch
                checked={donorMatches}
                onChange={setDonorMatches}
                className={`${
                  donorMatches ? "bg-blue-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    donorMatches ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </div>
        </div>

        {/* System Notifications */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">System notifications</h2>
          <div className="mt-4 space-y-2">
            {Object.entries(hospitalNotifications).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    setHospitalNotifications((prev) => ({
                      ...prev,
                      [key as keyof typeof prev]: !prev[key as keyof typeof prev],
                    }))
                  }
                  className="w-5 h-5 accent-blue-500"
                />
                <span className="text-gray-800 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Save & Cancel Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
            Save changes
          </button>
          <button className="border border-gray-400 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
