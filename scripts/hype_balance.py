from hyperliquid import Client

# Adresse de ton wallet Hyperliquid
address = "0x46bbF0eDBA51Ae50088284daA5616868d94B9fb8"

# Crée un client Hyperliquid (mainnet par défaut)
c = Client()

# Récupère les soldes spot (tokens)
user_state = c.user_state(address)
spot_balances = user_state["spotBalances"]

# Affiche le solde HYPE
found = False
for token in spot_balances:
    if token["coin"].upper() == "HYPE":
        print(f"Solde HYPE : {token['available']} HYPE")
        found = True

if not found:
    print("Aucun token HYPE trouvé sur ce wallet.") 