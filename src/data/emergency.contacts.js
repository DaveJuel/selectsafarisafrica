export const emergencyContacts = {
  rwanda: [
    { service: "national_police_emergency", number: "112" },
    { service: "ambulance_medical_emergency", number: "912" },
    { service: "fire_and_rescue_brigade", number: "111" },
    { service: "tourism_assistance_rdb", number: "+250 788 313 252" },
    { service: "rwanda_biomedical_center", number: "+250 788 202 080" },
    { service: "kigali_international_airport", number: "+250 788 177 000" }
  ],

  uganda: [
    { service: "police_general_emergency", number: "999" },
    { service: "alternate_national_emergency", number: "112" },
    { service: "uganda_tourism_board", number: "+256 414 560 800" },
    { service: "ministry_tourism_uganda", number: "+256 200 780 400" }
  ],

  tanzania: [
    { service: "police_tanzania", number: "999" },
    { service: "ambulance_medical_emergency_tz", number: "112" },
    { service: "fire_and_rescue_tz", number: "112" },
    { service: "tanapa_hotline", number: "+255 27 297 0404" },
    { service: "tanzania_tourist_board", number: "+255 22 266 4878" }
  ],

  burundi: [
    { service: "police_ambulance_fire_bi", number: "112" },
    { service: "burundi_red_cross", number: "109" },
    { service: "burundi_tourism_office", number: "+257 22 22 20 23" }
  ]
};


export function getEmergencyContacts(country) {
  const key = country.trim().toLowerCase();
  return emergencyContacts[key] || [];
}

