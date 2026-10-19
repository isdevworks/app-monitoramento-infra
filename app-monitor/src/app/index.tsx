import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [metricas, setMetricas] = useState<any>(null);

  const buscarMetricas = async () => {
    try {
      // ⚠️ ATENÇÃO AVALIADOR: Substitua 'SEU_IP_LOCAL' pelo endereço IPv4 da sua máquina
      const response = await fetch("http://SEU_IP_LOCAL:3000/metricas");
      const data = await response.json();
      setMetricas(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    buscarMetricas();
    const intervalo = setInterval(buscarMetricas, 3000);
    return () => clearInterval(intervalo);
  }, []);

  if (!metricas)
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00d2d3" />
        <Text style={styles.loadingText}>A conectar à Infraestrutura...</Text>
      </View>
    );

  const usoRam = parseFloat(metricas.memoria.usoPorcentagem);
  const corRam = usoRam > 80 ? "#ff6b6b" : "#1dd1a1";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="server-network"
          size={40}
          color="#00d2d3"
        />
        <Text style={styles.titulo}>{metricas.hostname || "Dashboard"}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="microsoft-windows"
            size={24}
            color="#c8d6e5"
          />
          <Text style={styles.cardTitle}>Sistema Operativo</Text>
        </View>
        <Text style={styles.dado}>{metricas.sistema}</Text>
        <Text style={styles.subDado}>Uptime: {metricas.uptimeHoras} horas</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.halfCard]}>
          <MaterialCommunityIcons name="cpu-64-bit" size={36} color="#feca57" />
          <Text style={styles.cardTitle}>CPU</Text>
          <Text style={styles.destaque}>{metricas.nucleosCPU}</Text>
          <Text style={styles.subDado}>Núcleos</Text>
        </View>

        <View style={[styles.card, styles.halfCard]}>
          <MaterialCommunityIcons name="memory" size={36} color={corRam} />
          <Text style={styles.cardTitle}>RAM</Text>
          <Text style={[styles.destaque, { color: corRam }]}>
            {metricas.memoria.usoPorcentagem}%
          </Text>
          <Text style={styles.subDado}>
            {metricas.memoria.usadaGB} / {metricas.memoria.totalGB} GB
          </Text>
        </View>
      </View>

      {/* NOVO CARTÃO: ARMAZENAMENTO */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="harddisk" size={24} color="#ff9f43" />
          <Text style={styles.cardTitle}>
            Armazenamento Principal (SSD/HDD)
          </Text>
        </View>
        <Text style={styles.dado}>{metricas.disco.usoPorcentagem}% de Uso</Text>
        <Text style={styles.subDado}>
          {metricas.disco.usadoGB} GB ocupados de {metricas.disco.totalGB} GB
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101418",
    padding: 20,
    paddingTop: 60,
  },
  center: { justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 15,
  },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#00d2d3" },
  loadingText: { color: "#00d2d3", marginTop: 15, fontSize: 16 },
  row: { flexDirection: "row", gap: 15 },
  card: {
    backgroundColor: "#1e242b",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2f3640",
  },
  halfCard: { flex: 1, alignItems: "center" },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: "#8395a7",
    fontWeight: "600",
    marginTop: 5,
  },
  dado: { fontSize: 22, color: "#ffffff", fontWeight: "bold" },
  subDado: { fontSize: 13, color: "#576574", marginTop: 5 },
  destaque: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 10,
  },
});
