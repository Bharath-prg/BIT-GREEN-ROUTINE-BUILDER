import React, { useEffect, useState } from "react";
import ActionCard from "../components/ActionCard";
import api from "../utils/api";

const Library = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [ecoActions, setEcoActions] = useState([]);
  const [savedActions, setSavedActions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActions();
    fetchSaved();
    // eslint-disable-next-line
  }, []);

  const fetchActions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/eco-actions");
      setEcoActions(res.data.data);
    } catch (err) {
      setError("Failed to load eco-actions");
    } finally {
      setLoading(false);
    }
  };

  const fetchSaved = async () => {
    try {
      const res = await api.get("/eco-actions/saved");
      setSavedActions(res.data.data.map((a) => a._id));
    } catch (err) {
      // Not logged in or error
      setSavedActions([]);
    }
  };

  const categories = [
    { id: "all", label: "All", icon: "🌍" },
    { id: "water", label: "Water", icon: "💧" },
    { id: "energy", label: "Energy", icon: "⚡" },
    { id: "waste", label: "Waste", icon: "♻️" },
    { id: "plastic", label: "Plastic", icon: "🚫" },
    { id: "travel", label: "Travel", icon: "🚗" },
    { id: "food", label: "Food", icon: "🥗" },
    { id: "other", label: "Other", icon: "✨" },
  ];

  const filteredActions = ecoActions
    .filter((action) =>
      activeCategory === "all" ? true : action.category === activeCategory
    )
    .filter(
      (action) =>
        action.title.toLowerCase().includes(search.toLowerCase()) ||
        action.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          Eco-Action Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
          Browse curated sustainability tips and actions
        </p>
      </div>

      {/* Category Filter */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeCategory === cat.id
                  ? "bg-eco-green-600 dark:bg-eco-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="card">
        <input
          type="text"
          placeholder="Search eco-actions..."
          className="input-field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-10">
            Loading eco-actions...
          </div>
        ) : error ? (
          <div className="col-span-3 text-red-500">{error}</div>
        ) : filteredActions.length === 0 ? (
          <div className="col-span-3 text-gray-500">No eco-actions found.</div>
        ) : (
          filteredActions.map((action) => (
            <ActionCard
              key={action._id}
              action={action}
              saved={savedActions.includes(action._id)}
              onToggleSave={async (id) => {
                try {
                  await api.post("/eco-actions/save", { actionId: id });
                  fetchSaved();
                } catch (err) {}
              }}
            />
          ))
        )}
      </div>

      {/* Saved Actions */}
      <div className="card">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">💾</span>
          <h3 className="text-xl font-bold">Saved Actions</h3>
          <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-eco-green-100 text-eco-green-700">
            {savedActions.length} Saved
          </span>
        </div>
        {savedActions.length === 0 ? (
          <p className="text-gray-500">
            You have no saved actions yet. Click the star ☆ on any action to
            save it for later!
          </p>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 overflow-y-auto"
            style={{ maxHeight: "420px", minHeight: "120px" }}
          >
            {ecoActions
              .filter((a) => savedActions.includes(a._id))
              .map((action) => (
                <ActionCard
                  key={action._id}
                  action={action}
                  saved={true}
                  onToggleSave={async (id) => {
                    try {
                      await api.post("/eco-actions/save", { actionId: id });
                      fetchSaved();
                    } catch (err) {}
                  }}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
