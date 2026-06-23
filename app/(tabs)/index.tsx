import { StyleSheet, FlatList, Text, View, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Producto } from '../../models/Producto';

let url = 'http://192.168.1.38:5000';

export default function ListaProductos() {
  const router = useRouter();
  const [listaProductos, setListaProductos] = useState<Producto[]>([]);

  async function obtenerProductos() {
    try {
      const response = await fetch(`${url}/productos`);
      const data = await response.json();
      setListaProductos(data.data);
    } catch (error) {
      alert('Error al obtener los productos');
    }
  }

  useEffect(() => {
    obtenerProductos();
  }, []);

  async function eliminarProducto(id: number) {
    try {
      const response = await fetch(`${url}/items/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      obtenerProductos();
    } catch (error) {
      alert('Error al eliminar el producto');
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listaProductos}
        keyExtractor={(item) => item.idProducto.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.url_fotografia ? (
              <Image
                source={{ uri: item.url_fotografia }}
                style={styles.itemImage}
              />
            ) : (
              <View style={styles.itemImagePlaceholder}>
                <Text style={styles.placeholderText}>📷</Text>
              </View>
            )}
            <View style={styles.itemInfo}>
              <Text style={styles.itemNombre}>{item.nombre}</Text>
              <Text style={styles.itemPrecio}>L. {item.precio}</Text>
              <Text style={styles.itemEstado}>
                {item.estado === 1 ? 'Disponible' : 'No disponible'}
              </Text>
            </View>
            <View style={styles.itemBotones}>
              <Button
                title="Detalle"
                onPress={() => router.push(`/producto/${item.idProducto}`)}
              />
              <Button
                title="Eliminar"
                color="#e74c3c"
                onPress={() => eliminarProducto(item.idProducto)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    gap: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemNombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrecio: {
    fontSize: 14,
    color: '#27ae60',
    marginTop: 2,
  },
  itemEstado: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  itemBotones: {
    gap: 4,
  },
});
