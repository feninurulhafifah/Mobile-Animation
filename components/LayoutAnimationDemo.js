import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LayoutAnimationDemo = () => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState([1, 2, 3]);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setExpanded(!expanded);
  };

  const addItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setItems([...items, items.length + 1]);
  };

  const removeItem = () => {
    if (items.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setItems(items.slice(0, -1));
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>7. Layout Animation</Text>
      <Text style={styles.cardDescription}>
        Animasi otomatis saat layout berubah (tambah/hapus item, expand/collapse)
      </Text>
      
      <View style={styles.animationContainer}>
        <TouchableOpacity
          style={styles.expandButton}
          onPress={toggleExpanded}
        >
          <Text style={styles.expandButtonText}>
            {expanded ? '▼ Collapse' : '▶ Expand'}
          </Text>
        </TouchableOpacity>

        {expanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>
              Konten yang di-expand dengan animasi layout
            </Text>
          </View>
        )}

        <View style={styles.itemsContainer}>
          {items.map((item) => (
            <View key={item} style={styles.item}>
              <Text style={styles.itemText}>Item {item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={addItem}>
            <Text style={styles.smallButtonText}>+ Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={removeItem}>
            <Text style={styles.smallButtonText}>- Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  animationContainer: {
    marginBottom: 15,
  },
  expandButton: {
    backgroundColor: '#06b6d4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  expandButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  expandedContent: {
    backgroundColor: '#e0f2fe',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  expandedText: {
    color: '#0369a1',
    fontSize: 14,
  },
  itemsContainer: {
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#06b6d4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#06b6d4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LayoutAnimationDemo;

