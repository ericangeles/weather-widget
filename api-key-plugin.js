// api-key-plugin.js
export default function apiKeyReplacementPlugin(apiKey) {
  return {
    name: 'api-key-replacement',
    transform(code, id) {
      // Replace the placeholder with the actual API key in all files
      if (code.includes('__OPENWEATHER_API_KEY__')) {
        console.log(`Replacing API key placeholder in: ${id}`);
        return code.replace(/__OPENWEATHER_API_KEY__/g, apiKey);
      }
      return code;
    }
  };
}
