
/**
 * Interlink Grid AI – Bot Upgrade Timer Dashboard (Template Logic)
 * This JS logic can be linked to a bot's dashboard display to show:
 * - Current subscription tier
 * - Last module unlocked
 * - Time remaining until next eligible upgrade
 */

// Sample bot data (in production, fetched per bot from backend)
const botData = {
  botId: "gridbot_0147",
  tier: "small_business",
  lastModuleUnlock: "2025-06-17T22:00:00Z"
};

// Subscription rule config (could be fetched from JSON or backend)
const tierRules = {
  home_personal: 14,
  personal_monetized: 14,
  small_business: 7,
  medium_large_business: 3,
  saas_affiliate: 0,
  enterprise: 0
};

// Calculate time difference
function getNextUnlockTime(bot) {
  const now = new Date();
  const last = new Date(bot.lastModuleUnlock);
  const waitDays = tierRules[bot.tier] || 14;
  const nextEligible = new Date(last.getTime() + waitDays * 24 * 60 * 60 * 1000);
  const remainingMs = nextEligible - now;

  if (remainingMs <= 0) return "✅ Eligible now";

  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  return `⏳ ${days}d ${hours}h ${minutes}m until next unlock`;
}

// Display
console.log(`Bot: ${botData.botId}`);
console.log(`Tier: ${botData.tier}`);
console.log(`Upgrade Status: ${getNextUnlockTime(botData)}`);
