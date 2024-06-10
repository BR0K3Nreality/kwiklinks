"use client";

import React, { useState } from "react";
import axios from "axios";

const ShortenUrl: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiryInDays, setExpiryInDays] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-zA-Z\\d_]*)?$", // fragment locator
    "i"
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!urlPattern.test(originalUrl)) {
      setError("Invalid URL format");
      setLoading(false);
      return;
    }

    const expiryDaysNumber = parseInt(expiryInDays, 10);
    if (
      isNaN(expiryDaysNumber) ||
      expiryDaysNumber < 0 ||
      expiryDaysNumber > 365
    ) {
      setError("Expiry days must be a whole number between 0 and 365");
      setLoading(false);
      return;
    }

    try {
      const strippedUrl = originalUrl.replace(/^(https?:\/\/)/, "");
      setShortenedUrl("");
      const response = await axios.post("/api/shorturl", {
        originalUrl: strippedUrl,
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

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://kwik.azurewebsites.net/api/ShortUrl/rd/${shortenedUrl}`
    );
    alert("URL copied to clipboard!");
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
            min="0"
            max="365"
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
          <div className="flex flex-col items-center justify-center gap-2">
            <input
              type="text"
              readOnly
              value={`https://kwik.azurewebsites.net/api/ShortUrl/rd/${shortenedUrl}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            <div className="flex flex-row gap-2">
              <button
                onClick={handleCopy}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Copy
              </button>
              <a
                href={`https://kwik.azurewebsites.net/api/ShortUrl/rd/${shortenedUrl}`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold text-nowrap py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Site
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenUrl;
