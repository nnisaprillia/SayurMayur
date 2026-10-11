import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function DetailScreen({ route, navigation }) {
  const { nama, harga, kategori } = route.params;
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState('');

  const kurang = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
      setPesan('');
    } else {
      setPesan('Jumlah minimal 1');
    }
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
    setPesan('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.kategori}>{kategori}</Text>
      <Text style={styles.nama}>{nama}</Text>
      <Text style={styles.harga}>Rp {harga.toLocaleString('id-ID')}</Text>

      <View style={styles.row}>
        <Pressable style={styles.btnQty} onPress={kurang}><Text style={styles.qtyText}>−</Text></Pressable>
        <Text style={styles.jumlah}>{jumlah}</Text>
        <Pressable style={styles.btnQty} onPress={tambah}><Text style={styles.qtyText}>+</Text></Pressable>
      </View>

      {pesan !== '' && <Text style={styles.feedback}>{pesan}</Text>}

      <Pressable
        style={({ pressed }) => [styles.btnUtama, pressed && { opacity: 0.8 }]}
        onPress={() => navigation.navigate('Konfirmasi', { nama, harga, jumlah })}
      >
        <Text style={styles.btnUtamaText}>Pesan Sekarang</Text>
      </Pressable>

      <Pressable style={styles.btnSekunder} onPress={() => navigation.goBack()}>
        <Text style={styles.btnSekunderText}>Kembali</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 24 },
  kategori: { color: theme.primary, fontWeight: '700', textTransform: 'uppercase', fontSize: 12 },
  nama: { fontSize: 28, fontWeight: '800', color: theme.text, marginTop: 4 },
  harga: { fontSize: 20, color: theme.primary, fontWeight: '700', marginVertical: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 16 },
  btnQty: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 22, color: theme.text },
  jumlah: { fontSize: 22, fontWeight: '700', color: theme.text, minWidth: 30, textAlign: 'center' },
  feedback: { color: theme.danger, marginBottom: 8 },
  btnUtama: { backgroundColor: theme.primary, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 16 },
  btnUtamaText: { color: theme.onPrimary, fontWeight: '700', fontSize: 16 },
  btnSekunder: { padding: 16, alignItems: 'center' },
  btnSekunderText: { color: theme.textMuted },
});
