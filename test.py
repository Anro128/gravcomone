import matplotlib.pyplot as plt
import pandas as pd

data = {
    'Luas_Panen': [100, 200, 300, 400, 500],
    'Produktivitas': [1.2, 2.5, 3.0, 4.5, 5.0],
    'Produksi': [120, 500, 900, 1800, 2500],
}
df = pd.DataFrame(data)

plt.figure(figsize=(10, 6))

# Membuat bubble chart
scatter = plt.scatter(
    df['Luas_Panen'], 
    df['Produktivitas'], 
    s=df['Produksi'],  # Ukuran bubble berdasarkan kolom produksi
    alpha=0.5,
    c=df['Produksi'],  # Warna bubble berdasarkan nilai produksi untuk visibilitas yang lebih baik
    cmap='viridis',
    edgecolors='w',  # Warna pinggiran bubble
    linewidth=0.5
)

# Menambahkan label dan judul
plt.xlabel('Luas Panen')
plt.ylabel('Produktivitas')
plt.title('Bubble Chart Luas Panen vs Produktivitas dengan Ukuran Bubble Produksi')

# Menambahkan color bar untuk merepresentasikan nilai produksi
plt.colorbar(scatter, label='Produksi')

# Menambahkan label pada setiap bubble
for i in range(len(df)):
    plt.text(
        df['Luas_Panen'][i], 
        df['Produktivitas'][i], 
        df['Produksi'][i],
        fontsize=9, 
        ha='right'
    )

# Menampilkan plot
plt.show()

