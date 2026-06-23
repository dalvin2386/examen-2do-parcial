import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Producto } from '../../models/Producto';

let url = 'http://192.168.1.38:5000';

export default function DetalleProducto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    obtenerProducto();
  }, []);

  async function obtenerProducto() {
    try {
      const response = await fetch(`${url}/productos`);
      const data = await response.json();
      const productoEncontrado = data.data.find(
        (p: Producto) => p.idProducto === parseInt(id as string)
      );
      setProducto(productoEncontrado || null);
    } catch (error) {
      alert('Error al obtener el producto');
    }
  }

  if (!producto) {
    return (
      <View style={styles.container}>
        <Text style={styles.cargando}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {producto.url_fotografia ? (
        <Image
          source={{ uri: producto.url_fotografia }}
          style={styles.image}
        />
      ) : (
        <View style={styles.sinImagen}>
          <Text style={styles.sinImagenText}>Sin imagen</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>L. {producto.precio}</Text>
        <Text style={styles.estado}>
          {producto.estado === 1 ? 'Disponible' : 'No disponible'}
        </Text>
        <Text style={styles.categoria}>Categoría: {producto.categoria}</Text>
        <Text style={styles.descripcion}>{producto.descripcion}</Text>
      </View>

      <View style={styles.boton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  cargando: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  sinImagen: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sinImagenText: {
    color: '#999',
    fontSize: 16,
  },
  info: {
    gap: 8,
  },
  nombre: {
    fontSize: 24,
    fontWeight: '700',
  },
  precio: {
    fontSize: 20,
    color: '#27ae60',
    fontWeight: '600',
  },
  estado: {
    fontSize: 16,
    color: '#555',
  },
  categoria: {
    fontSize: 14,
    color: '#888',
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  boton: {
    marginTop: 24,
  },
});
