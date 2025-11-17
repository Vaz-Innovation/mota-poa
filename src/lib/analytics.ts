/**
 * Analytics tracking utility
 * Tracks user interactions and conversions
 */

type EventName = 
  | 'whatsapp_click_header'
  | 'whatsapp_click_hero_banner'
  | 'whatsapp_click_process_consultation'
  | 'whatsapp_click_floating_button'
  | 'whatsapp_conversion';

interface EventProperties {
  source?: string;
  banner_id?: number;
  banner_title?: string;
  process_number?: string;
  timestamp?: string;
}

/**
 * Track an analytics event
 * Currently logs to console, can be extended to send to GA4, Facebook Pixel, etc.
 */
export const trackEvent = (eventName: EventName, properties?: EventProperties) => {
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  // Log to console for debugging
  console.log('📊 Analytics Event:', eventData);

  // TODO: Integrate with your analytics platform
  // Example for Google Analytics 4:
  // if (window.gtag) {
  //   window.gtag('event', eventName, properties);
  // }

  // Example for Facebook Pixel:
  // if (window.fbq) {
  //   window.fbq('track', 'Lead', properties);
  // }

  // Store in localStorage for now (can be sent to backend later)
  try {
    const existingEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    existingEvents.push(eventData);
    // Keep only last 100 events
    if (existingEvents.length > 100) {
      existingEvents.shift();
    }
    localStorage.setItem('analytics_events', JSON.stringify(existingEvents));
  } catch (error) {
    console.error('Failed to store analytics event:', error);
  }
};

/**
 * Track WhatsApp click conversion
 */
export const trackWhatsAppClick = (source: string, additionalProps?: EventProperties) => {
  trackEvent('whatsapp_conversion', {
    source,
    ...additionalProps,
  });
};

/**
 * Get all stored analytics events (for debugging or sending to backend)
 */
export const getStoredEvents = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem('analytics_events') || '[]');
  } catch {
    return [];
  }
};

/**
 * Clear stored analytics events
 */
export const clearStoredEvents = () => {
  localStorage.removeItem('analytics_events');
};
