from hyperliquid import Client

# Adresse de ton wallet Hyperliquid
address = "0x46bbF0eDBA51Ae50088284daA5616868d94B9fb8"

# Crée un client Hyperliquid (mainnet par défaut)
c = Client()

# Récupère les soldes spot (tokens)
user_state = c.user_state(address)
spot_balances = user_state["spotBalances"]

print("--- Spot Assets ---")
if not spot_balances:
    print("Aucun token trouvé sur ce wallet.")
else:
    for token in spot_balances:
        coin = token['coin']
        available = token['available']
        total = token.get('total', available)
        usd_value = token.get('usdValue', None)
        if usd_value is not None:
            print(f"{coin} : {available} (total: {total}) ≈ {usd_value} USD")
        else:
            print(f"{coin} : {available} (total: {total})") 