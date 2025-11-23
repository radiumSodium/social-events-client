// src/pages/EventDetails.jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinLoading, setJoinLoading] = useState(false);
  const [error, setError] = useState("");

  // Load event details
  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`);
        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.message || "Failed to load event");
        }

        setEvent(data.event);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("You must be logged in to join this event.");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!event?._id) {
      toast.error("Event information is not loaded yet.");
      return;
    }

    if (event.eventDate) {
      const eventDate = new Date(event.eventDate);
      const now = new Date();
      if (eventDate <= now) {
        toast.error("This event date has already passed.");
        return;
      }
    }

    try {
      setJoinLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/join-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event._id,
          userEmail: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to join event.");
      }

      toast.success("You have successfully joined this event!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setJoinLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="text-sm text-base-content/70">
          {error || "No event data available."}
        </p>
        <Link to="/upcoming-events" className="btn btn-primary">
          Back to Upcoming Events
        </Link>
      </div>
    );
  }

  const eventDateStr = event.eventDate
    ? new Date(event.eventDate).toLocaleString()
    : "Date not available";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top layout: image + basic info */}
      <div className="bg-base-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-60 md:h-full bg-base-300">
            {event.thumbnail ? (
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-base-content/70">
                No image available
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="badge badge-outline">{event.eventType}</span>
              <span className="text-xs md:text-sm text-base-content/70">
                {eventDateStr}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {event.title}
            </h1>
            <p className="text-sm md:text-base text-base-content/80">
              {event.location}
            </p>
            <div className="mt-auto pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={handleJoin}
                className="btn btn-primary"
                disabled={joinLoading}
              >
                {joinLoading ? "Joining..." : "Join Event"}
              </button>
              <Link to="/upcoming-events" className="btn btn-ghost btn-sm">
                Back to Upcoming
              </Link>
            </div>
            <p className="text-xs text-base-content/60">
              Organizer: {event.creatorEmail || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="bg-base-100 rounded-3xl border shadow-sm p-6 md:p-8 space-y-3">
        <h2 className="text-xl md:text-2xl font-bold">Event Details</h2>
        <p className="text-sm md:text-base text-base-content/80 whitespace-pre-line">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
