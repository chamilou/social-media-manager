export async function getMessages(locale) {
  try {
    const messages = await import(`../locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return {}; // Return empty object if translation fails
  }
}
