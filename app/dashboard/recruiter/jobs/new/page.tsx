"use client";

import { createJob } from "@/lib/actions/jobs";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import type { JobFormData } from "@/lib/types/job";

export default function Page() {
  const [form, setForm] = useState<JobFormData>({
    title: "",
    company: "",
    category: "Engineering & Tech",
    jobType: "Full-time",
    remote: false,
    location: "",
    deadline: "",
    salaryMin: "",
    salaryMax: "",
    salaryPeriod: "per hour",
    responsibilities: "",
    requirements: "",
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const jobTypes: string[] = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    const checked =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : false;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const jobData = {
        ...form,
        salaryMin: form.salaryMin ? Number(form.salaryMin) : 0,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : 0,
      };

      const result = await createJob(jobData);

      if (result) {
        toast.success("Successfully added job");

        setSuccess(true);

        setForm({
          title: "",
          company: "",
          category: "Engineering & Tech",
          jobType: "Full-time",
          remote: false,
          location: "",
          deadline: "",
          salaryMin: "",
          salaryMax: "",
          salaryPeriod: "per hour",
          responsibilities: "",
          requirements: "",
        });
      } else {
        toast.error("Failed to add job");
      }
    } catch (error) {
      console.error("Job creation error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] px-8 py-6 text-white">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Manage Jobs &gt; Create New Listing
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Post a New Job
            </h1>

            <p className="mt-2 text-gray-400">
              Fill in the position specifications to attract qualified talent.
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
            Job information submitted successfully!
          </div>
        )}

        {/* Basic Information */}
        <div className="mb-6 rounded-2xl bg-[#11111A] p-6">
          <h2 className="mb-6 text-lg font-semibold">
            1. Basic Information
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Job Title *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Frontend Developer"
                className="w-full rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Company Name *
                </label>

                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  placeholder="HirePulse Network"
                  className="w-full rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Job Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
                >
                  <option>Engineering & Tech</option>
                  <option>Design & Creative</option>
                  <option>Marketing</option>
                  <option>Business & Finance</option>
                  <option>Customer Support</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Job Type *
              </label>

              <div className="grid grid-cols-4 gap-3">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        jobType: type,
                      }));
                      setSuccess(false);
                    }}
                    className={`rounded-lg py-3 transition ${
                      form.jobType === type
                        ? "bg-indigo-600"
                        : "bg-[#1A1A24] hover:bg-[#252532]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6 rounded-2xl bg-[#11111A] p-6">
          <h2 className="mb-6 text-lg font-semibold">
            2. Location, Compensation & Timeline
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-xl bg-[#1A1A24] p-4">
              <div>
                <h3 className="font-medium">
                  Remote Work Allowed
                </h3>

                <p className="text-sm text-gray-500">
                  Enable worldwide applications
                </p>
              </div>

              <input
                type="checkbox"
                name="remote"
                checked={form.remote}
                onChange={handleChange}
                className="h-5 w-5 cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required={!form.remote}
                placeholder="New York, USA"
                className="rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
              />

              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="salaryMin"
                value={form.salaryMin}
                onChange={handleChange}
                min="0"
                placeholder="Minimum salary"
                className="rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
              />

              <input
                type="number"
                name="salaryMax"
                value={form.salaryMax}
                onChange={handleChange}
                min="0"
                placeholder="Maximum salary"
                className="rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
              />

              <select
                name="salaryPeriod"
                value={form.salaryPeriod}
                onChange={handleChange}
                className="rounded-lg bg-[#1A1A24] px-4 py-3 outline-none"
              >
                <option>per hour</option>
                <option>per month</option>
                <option>per year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="rounded-2xl bg-[#11111A] p-6">
          <h2 className="mb-6 text-lg font-semibold">
            3. Responsibilities & Requirements
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Key Responsibilities *
              </label>

              <textarea
                name="responsibilities"
                value={form.responsibilities}
                onChange={handleChange}
                rows={5}
                required
                className="w-full rounded-lg bg-[#1A1A24] p-4 outline-none"
                placeholder="Enter responsibilities..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Qualifications & Requirements *
              </label>

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows={5}
                required
                className="w-full rounded-lg bg-[#1A1A24] p-4 outline-none"
                placeholder="Enter requirements..."
              />
            </div>
          </div>

          {/* Publish Job */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-8 py-3 font-medium transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Job →"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}