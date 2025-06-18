// Discord webhook analytics utility for tracking user interactions
interface UserAnalytics {
  eventType: string;
  eventDetails: {
    name: string;
    url: string;
    additionalInfo?: string;
  };
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
  viewportSize: string;
  timestamp: string;
  timezone: string;
  sessionId: string;
  referrer: string;
  locationData?: {
    ip: string;
    city: string;
    region: string;
    country: string;
    isp: string;
    lat: number;
    lng: number;
  };
}

// Generate unique session ID
function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server-side';
  
  let sessionId = sessionStorage.getItem('jf_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('jf_session_id', sessionId);
  }
  return sessionId;
}

// Obfuscated webhook configuration (to prevent easy discovery and spam)
function getWebhookConfig() {
  // Split and encode the webhook URL to make it harder to find via simple grep/search
  const parts = [
    'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3Mv', // base64: 'https://discord.com/api/webhooks/'
    'MTM4NTAwNjk5MTY3NTc1MjUyOQ==', // base64: '1385006991675752529'
    'YmxhSG9CVUMzOVpoN0p0Q291Z05LdGh4eGdScTVmMGpTeGlZaVJ5U2VUZDJ1THYtZ2lwQXYyTDdhT0ZPREZZY0MwZ2M=', // base64: webhook token
  ];
  
  try {
    const baseUrl = atob(parts[0]);
    const id = atob(parts[1]);
    const token = atob(parts[2]);
    
    return `${baseUrl}${id}/${token}`;
  } catch {
    return null;
  }
}

// Get user's location data
async function getLocationData(): Promise<UserAnalytics['locationData'] | undefined> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      ip: data.ip || 'Unknown',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      isp: data.org || 'Unknown',
      lat: data.latitude || 0,
      lng: data.longitude || 0,
    };
  } catch {
    return undefined;
  }
}

// Collect user analytics data
async function collectUserData(eventType: string, eventName: string, additionalInfo?: string): Promise<UserAnalytics> {
  const locationData = await getLocationData();
  
  return {
    eventType,
    eventDetails: {
      name: eventName,
      url: window.location.href,
      additionalInfo,
    },
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toLocaleString('en-GB', { 
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    sessionId: getSessionId(),
    referrer: document.referrer || 'Direct',
    locationData,
  };
}

// Create Discord embed
function createDiscordEmbed(data: UserAnalytics) {
  const browserInfo = getBrowserInfo(data.userAgent);
  
  return {
    username: 'Joefergraphy Analytics',
    embeds: [{
      title: `🚀 Project Click Detected!`,
      description: `Someone clicked on **${data.eventDetails.name}**`,
      color: 0x000000, // Black color
      fields: [
        {
          name: '📂 Project Details',
          value: `**Name:** ${data.eventDetails.name}\n**URL:** ${data.eventDetails.url}${data.eventDetails.additionalInfo ? `\n**Info:** ${data.eventDetails.additionalInfo}` : ''}`,
          inline: false
        },
        {
          name: '👤 User Information',
          value: `**Browser:** ${browserInfo.name}${browserInfo.version ? `/${browserInfo.version}` : ''}\n**Platform:** ${data.platform}\n**Language:** ${data.language}\n**Screen:** ${data.screenResolution}\n**Viewport:** ${data.viewportSize}`,
          inline: true
        },
        {
          name: '🌍 Location Information',
          value: data.locationData 
            ? `**IP:** ${data.locationData.ip}\n**City:** ${data.locationData.city}\n**Region:** ${data.locationData.region}\n**Country:** ${data.locationData.country}\n**ISP:** ${data.locationData.isp}`
            : 'Location data unavailable',
          inline: true
        },
        {
          name: '⏰ Session Details',
          value: `**Time:** ${data.timestamp}\n**Timezone:** ${data.timezone}\n**Session ID:** ${data.sessionId}\n**Referrer:** ${data.referrer}`,
          inline: false
        },
        {
          name: '📍 Coordinates',
          value: data.locationData && data.locationData.lat && data.locationData.lng
            ? `**Lat:** ${data.locationData.lat}\n**Lng:** ${data.locationData.lng}\n🗺️ [Open in Google Maps](https://www.google.com/maps?q=${data.locationData.lat},${data.locationData.lng})`
            : 'Coordinates unavailable',
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Joefergraphy Portfolio Analytics'
      }
    }]
  };
}

// Helper function to parse browser information
function getBrowserInfo(userAgent: string) {
  const browsers = [
    { name: 'Chrome', regex: /Chrome\/(\d+\.\d+)/ },
    { name: 'Firefox', regex: /Firefox\/(\d+\.\d+)/ },
    { name: 'Safari', regex: /Version\/(\d+\.\d+).*Safari/ },
    { name: 'Edge', regex: /Edg\/(\d+\.\d+)/ },
    { name: 'Opera', regex: /OPR\/(\d+\.\d+)/ }
  ];

  for (const browser of browsers) {
    const match = userAgent.match(browser.regex);
    if (match) {
      return { name: browser.name, version: match[1] };
    }
  }

  return { name: 'Unknown', version: '' };
}

// Helper function to get country flag emoji
function getCountryFlag(country?: string) {
  const flags: { [key: string]: string } = {
    'United Kingdom': '🇬🇧',
    'United States': '🇺🇸',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
    'Netherlands': '🇳🇱',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Denmark': '🇩🇰',
    'Finland': '🇫🇮',
    'Ireland': '🇮🇪',
    'Belgium': '🇧🇪',
    'Switzerland': '🇨🇭',
    'Austria': '🇦🇹',
    'Portugal': '🇵🇹',
    'Japan': '🇯🇵',
    'South Korea': '🇰🇷',
    'China': '🇨🇳',
    'Israel': '🇮🇱',
    'India': '🇮🇳',
    'Brazil': '🇧🇷',
    'Mexico': '🇲🇽',
    'Argentina': '🇦🇷'
  };

  return country ? flags[country] || '🌐' : '🌐';
}

// Send webhook to Discord
async function sendDiscordWebhook(data: UserAnalytics) {
  const webhookUrl = getWebhookConfig();
  
  if (!webhookUrl) {
    return; // Silently fail if webhook config is corrupted
  }
  
  try {
    const embed = createDiscordEmbed(data);
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embed),
    });
  } catch (error) {
    // Silently fail to avoid exposing the tracking to users
  }
}

// Main function to track events
export async function trackEvent(eventType: string, eventName: string, additionalInfo?: string) {
  if (typeof window === 'undefined') return;
  
  try {
    const analytics = await collectUserData(eventType, eventName, additionalInfo);
    await sendDiscordWebhook(analytics);
  } catch (error) {
    // Silently fail to avoid exposing the tracking to users
  }
}

// Track page views
export function trackPageView(pageName: string) {
  if (typeof window === 'undefined') return;
  
  // Delay to ensure page is fully loaded
  setTimeout(() => {
    trackEvent('Page View', `viewed ${pageName}`, `Page: ${pageName}`);
  }, 1000);
}

// Track button clicks
export function trackButtonClick(buttonName: string, additionalInfo?: string) {
  trackEvent('Button Click', `clicked ${buttonName}`, additionalInfo);
}

// Track modal opens
export function trackModalOpen(modalName: string) {
  trackEvent('Modal Open', `opened ${modalName} modal`, `Modal: ${modalName}`);
}

// Track form interactions
export function trackFormInteraction(formName: string, action: string) {
  trackEvent('Form Interaction', `${action} ${formName}`, `Form: ${formName}, Action: ${action}`);
} 