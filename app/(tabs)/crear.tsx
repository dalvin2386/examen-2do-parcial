import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

let url = 'http://192.168.1.38:5000';

export default function CrearProducto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('1');
  const [categoria, setCategoria] = useState('');
  const [image, setImage] = useState<string | null>(null);

  async function openCamera() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function guardarProducto() {
    if (!nombre || !precio) {
      alert('Nombre y precio son obligatorios');
      return;
    }

    try {
      const body: any = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        estado: parseInt(estado),
        categoria,
        url_fotografia: image || '',
      };

      const response = await fetch(`${url}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      alert('Producto guardado correctamente');

      setNombre('');
      setDescripcion('');
      setPrecio('');
      setEstado('1');
      setCategoria('');
      setImage(null);
    } catch (error) {
      alert('Error al guardar el producto');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.titulo}>Crear Producto</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="decimal-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Categoría"
            value={categoria}
            onChangeText={setCategoria}
          />

          <Text style={styles.label}>Estado:</Text>
          <View style={styles.estadoContainer}>
            <Button
              title="Disponible"
              color={estado === '1' ? '#27ae60' : '#ccc'}
              onPress={() => setEstado('1')}
            />
            <Button
              title="No disponible"
              color={estado === '0' ? '#e74c3c' : '#ccc'}
              onPress={() => setEstado('0')}
            />
          </View>

          <Text style={styles.label}>Fotografía:</Text>
          <View style={styles.fotoBotones}>
            <Button title="Abrir Cámara" onPress={openCamera} />
            <Button title="Abrir Galería" onPress={openGallery} />
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={styles.imagePreview}
            />
          )}

          <View style={styles.guardarBoton}>
            <Button title="Guardar Producto" onPress={guardarProducto} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
    gap: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  estadoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  fotoBotones: {
    flexDirection: 'row',
    gap: 12,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  guardarBoton: {
    marginTop: 8,
  },
});
