import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function KonfirmasiScreen({ route, navigation }) {
  const { nama, harga, jumlah } = route.params;
  const [selesai, setSelesai] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef(null);
  const total = harga * jumlah;

  const konfirmasi = () => {
    // Tampilkan status proses dulu; popup muncul setelah interval 3 detik.
    setSelesai(true);
    timerRef.current = setInterval(() => {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setShowPopup(true);
    }, 3000);
  };

  // Batalkan interval bila layar ditinggalkan sebelum 3 detik.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const keBeranda = () => {
    setShowPopup(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Produk</Text>
        <Text style={styles.value}>{nama}</Text>
        <Text style={styles.label}>Harga satuan</Text>
        <Text style={styles.value}>Rp {harga.toLocaleString('id-ID')}</Text>
        <Text style={styles.label}>Jumlah</Text>
        <Text style={styles.value}>{jumlah}</Text>
        <View style={styles.garis} />
        <Text style={styles.label}>Total bayar</Text>
        <Text style={styles.total}>Rp {total.toLocaleString('id-ID')}</Text>
      </View>

      {selesai && (
        <View style={styles.proses}>
          <ActivityIndicator color={theme.primary} />
          <Text style={styles.sukses}>Pesanan sedang diproses…</Text>
        </View>
      )}

      <Pressable
        style={({ pressed }) => [styles.btnUtama, (pressed || selesai) && { opacity: 0.6 }]}
        onPress={konfirmasi}
        disabled={selesai}
      >
        <Text style={styles.btnUtamaText}>Konfirmasi Pesanan</Text>
      </Pressable>

      <Pressable style={styles.btnSekunder} onPress={() => navigation.goBack()}>
        <Text style={styles.btnSekunderText}>Ubah Pesanan</Text>
      </Pressable>

      {/* Popup informasi setelah interval 3 detik */}
      <Modal
        visible={showPopup}
        transparent
        animationType="fade"
        onRequestClose={keBeranda}
      >
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>✅</Text>
            <Text style={styles.modalTitle}>Pesanan Anda Selesai</Text>
            <Text style={styles.modalInfo}>
              {jumlah} x {nama}
            </Text>
            <Text style={styles.modalTotal}>Rp {total.toLocaleString('id-ID')}</Text>

            <Pressable
              style={({ pressed }) => [styles.btnUtama, pressed && { opacity: 0.8 }]}
              onPress={keBeranda}
            >
              <Text style={styles.btnUtamaText}>Kembali ke Beranda</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 24 },
  card: { backgroundColor: theme.surface, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: theme.border },
  label: { color: theme.textMuted, fontSize: 12, marginTop: 8 },
  value: { color: theme.text, fontSize: 17, fontWeight: '600' },
  garis: { height: 1, backgroundColor: theme.border, marginVertical: 12 },
  total: { color: theme.primary, fontSize: 26, fontWeight: '800' },
  proses: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 },
  sukses: { color: theme.primary, fontWeight: '600' },
  btnUtama: { backgroundColor: theme.primary, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 24 },
  btnUtamaText: { color: theme.onPrimary, fontWeight: '700', fontSize: 16 },
  btnSekunder: { padding: 16, alignItems: 'center' },
  btnSekunderText: { color: theme.textMuted },
  overlay: { flex: 1, backgroundColor: theme.overlay, justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { width: '100%', backgroundColor: theme.surface, borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: theme.border },
  modalEmoji: { fontSize: 52, marginBottom: 4 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: theme.text, textAlign: 'center' },
  modalInfo: { color: theme.textMuted, marginTop: 10, textAlign: 'center' },
  modalTotal: { color: theme.primary, fontSize: 26, fontWeight: '800', marginTop: 8 },
});
