import React from 'react';

const LocationSearchPanel = ({
  suggestions = [],
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (item) => {
    const name = item?.properties?.label || item?.properties?.name || 'Unknown location';
    if (activeField === 'pickup') {
      setPickup(name);
    } else if (activeField === 'destination') {
      setDestination(name);
    }
  };

  console.log("🔍 Location suggestions:", suggestions);
  console.log("🧭 Active field:", activeField);

  return (
    <div className="p-2 space-y-4 overflow-y-auto max-h-[70vh]">
      {suggestions.length === 0 ? (
        <p className="text-center pt-7 text-gray-500">No suggestions found</p>
      ) : (
        suggestions.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(item)}
            className="bg-[#eee] p-3 border-2 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all"
          >
            <div className="h-8 w-9 bg-white rounded-full flex items-center justify-center shadow">
              <i className="ri-map-pin-fill text-xl"></i>
            </div>
            <div>
              <h4 className="text-gray-700 font-bold text-sm">
                {item?.properties?.label || item?.properties?.name}
              </h4>
              {item?.properties?.city && (
                <p className="text-gray-500 text-xs">{item.properties.city}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LocationSearchPanel;
