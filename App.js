import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch data function
  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    // Simulate API fetch
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: `item-${(page - 1) * 10 + i + 1}`,
        title: `Item ${(page - 1) * 10 + i + 1}`,
      }));
      setData(prevData => [...prevData, ...newData]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  // Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // Render each item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={fetchData}
        onEndReachedThreshold={1.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 20, marginVertical: 5, backgroundColor: '#f0f0f0', borderRadius: 5 },
  text: { fontSize: 18 },
});

export default App;
