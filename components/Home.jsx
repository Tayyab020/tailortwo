import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FAB, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
const Home = () => {
  const navigation = useNavigation();
  const [gigs, setGigs] = useState([]); // Step 2: State to store gigs

  useEffect(() => {
    // Step 3: Fetch gigs from your backend
    const fetchGigs = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/blog/all');
        console.log(response)
        setGigs(response.data); // Update state with fetched gigs
      } catch (error) {
        console.error('Failed to fetch gigs:', error);
      }
    };

    fetchGigs();
  }, []); // Empty dependency array means this effect runs once on mount

  const navigateToOrder = () => {
    navigation.navigate('creategig');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* {gigs.map((gig) => (
          <Card key={gig.id} style={styles.card}>
            <Card.Title title={gig.title} />
            <Card.Content>
              <Text>{gig.description}</Text>
            </Card.Content>
          </Card>
        ))} */}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={navigateToOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: '#FF8C00',
  },
});

export default Home;