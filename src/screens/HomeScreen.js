import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { PRODUK, KATEGORI } from '../data/produk';
import { theme } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  const [kategori, setKategori] = useState('Semua');

  const data = kategori === 'Semua'
    ? PRODUK
    : PRODUK.filter((p) => p.kategori === kategori);

  return (
    <View style={styles.container}>
      <Text style={styles.sapaan}>Mau masak apa hari ini?</Text>

      <View style={styles.chipRow}>
        {KATEGORI.map((k) => (
          <Pressable
            key={k}
            onPress={() => setKategori(k)}
            style={[styles.chip, kategori === k && styles.chipAktif]}
          >
            <Text style={[styles.chipText, kategori === k && styles.chipTextAktif]}>{k}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
            onPress={() =>
              navigation.navigate('Detail', {
                nama: item.nama,
                harga: item.harga,
                kategori: item.kategori,
              })
            }
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.nama}>{item.nama}</Text>
            <Text style={styles.harga}>Rp {item.harga.toLocaleString('id-ID')}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 16 },
  sapaan: { fontSize: 20, fontWeight: '700', color: theme.text, marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border },
  chipAktif: { backgroundColor: theme.primary, borderColor: theme.primary },
  chipText: { color: theme.text },
  chipTextAktif: { color: theme.onPrimary, fontWeight: '700' },
  card: { flex: 1, backgroundColor: theme.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: theme.border },
  emoji: { fontSize: 44, marginBottom: 8 },
  nama: { fontSize: 15, fontWeight: '600', color: theme.text },
  harga: { fontSize: 14, color: theme.primary, marginTop: 4, fontWeight: '700' },
});
