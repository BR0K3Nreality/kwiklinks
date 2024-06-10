"use client";

import React, { useState } from "react";
import axios from "axios";

const ShortenUrl: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiryInDays, setExpiryInDays] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      setShortenedUrl("");
      const response = await axios.post("/api/shorturl", {
        originalUrl,
        expiryInDays,
      });

      setShortenedUrl(response.data);
      setError("");
    } catch (error) {
      setError("Error creating shortened URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="originalUrl"
          >
            Original URL
          </label>
          <input
            id="originalUrl"
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="expiryInDays"
          >
            Expiry in Days
          </label>
          <input
            id="expiryInDays"
            type="number"
            value={expiryInDays}
            onChange={(e) => setExpiryInDays(e.target.value)}
            placeholder="Enter days for short URL to expire"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {shortenedUrl && (
        <div className="mt-4 text-center">
          <p>Shortened URL:</p>
          <a
            href={`https://myuniqueappname12345mick01.azurewebsites.net/api/ShortUrl/rd/${shortenedUrl}`}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to go to destination URL
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenUrl;
