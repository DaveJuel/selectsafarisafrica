export const emergencyContacts = {
  rwanda: [
    { service: "National Police (Emergency)", number: "112" },
    { service: "Ambulance / Medical Emergency", number: "912" },
    { service: "Fire and Rescue Brigade", number: "111" },
    { service: "Tourism Assistance (Rwanda Development Board)", number: "+250 788 313 252" },
    { service: "Rwanda Biomedical Center (Health Support)", number: "+250 788 202 080" },
    { service: "Kigali International Airport – Emergency Desk", number: "+250 788 177 000" },
  ],

  uganda: [
    { service: "Police / General emergency", number: "999" },
    { service: "Alternate national emergency short-code", number: "112" },
    { service: "Uganda Tourism Board (general / visitor enquiries)", number: "+256 414 560 800" },
    { service: "Ministry of Tourism, Wildlife & Antiquities", number: "+256 200 780 400" }
  ],

  tanzania: [
    { service: "Police", number: "999" },
    { service: "Ambulance / Medical emergency", number: "112" },
    { service: "Fire and Rescue", number: "112" },
    { service: "Tanzania National Parks (TANAPA) – Hotline / park emergencies", number: "+255 27 297 0404" },
    { service: "Tanzania Tourist Board / Tanzania Tourism", number: "+255 22 266 4878" }
  ],

  burundi: [
    { service: "Police / Ambulance / Fire", number: "112" },
    { service: "Burundi Red Cross", number: "109" },
    { service: "Burundi National Office of Tourism", number: "+257 22 22 20 23" }
  ]
};

export function getEmergencyContacts(country) {
  const key = country.trim().toLowerCase();
  return emergencyContacts[key] || [];
}

