import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { API_ENDPOINTS } from "../../features/base/config";
import { useNavigate } from "react-router-dom";
import { getValidAccessToken } from "../../auth/AccessToken";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function CommentWithRating({ eventId }) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!content.trim()) {
      setMsg("Please enter a comment.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const access = await getValidAccessToken(navigate);
      const res = await fetch(
        `${API_ENDPOINTS.MAIN_URL}/events/${eventId}/feedback/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: access ? `Bearer ${access}` : "",
          },
          body: JSON.stringify({
            content,
            rating: value,
          }),
        }
      );

      if (res.ok) {
        setMsg("🎉 Feedback submitted successfully!");
        setContent("");
        setValue(2);
      } else {
        const errorData = await res.json();
        setMsg("❌ Error: " + (errorData.detail || "Something went wrong"));
      }
    } catch (error) {
      setMsg("❌ Network or server error.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Leave a Comment & Rating</h3>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => setValue(newValue)}
          onChangeActive={(event, newHover) => setHover(newHover)}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2, minWidth: 100 }}>
          {value !== null && labels[hover !== -1 ? hover : value]}
        </Box>
      </Box>

      <textarea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment here..."
        className="w-full p-2 border rounded resize-none mb-4 focus:outline-blue-500"
        disabled={loading}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>

      {msg && <p className="mt-3 text-center text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
