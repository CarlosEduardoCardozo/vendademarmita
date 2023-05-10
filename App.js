import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    setTotalPrice(totalPrice + 10);
  };

  const removeItemFromCart = (item) => {
    const index = cartItems.indexOf(item);
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    setTotalPrice(totalPrice - 10);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bom dia Eduardo</Text>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.item}>
          <Image source={require('./assets/marmita1.png')} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Marmita Especial</Text>
            <Text style={styles.itemPrice}>R$ 10,00</Text>
          </View>
          <TouchableOpacity onPress={() => addItemToCart('Marmita Especial')} style={styles.itemButton}>
            <Text style={styles.itemButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Image source={require('./assets/marmita2.png')} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Marmita Fitness</Text>
            <Text style={styles.itemPrice}>R$ 10,00</Text>
          </View>
          <TouchableOpacity onPress={() => addItemToCart('Marmita Fitness')} style={styles.itemButton}>
            <Text style={styles.itemButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Image source={require('./assets/marmita3.png')} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Marmita Vegana</Text>
            <Text style={styles.itemPrice}>R$ 10,00</Text>
          </View>
          <TouchableOpacity onPress={() => addItemToCart('Marmita Vegana')} style={styles.itemButton}>
            <Text style={styles.itemButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={visible} animationType="slide">
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Carrinho de Compras</Text>
          {cartItems.length > 0 ? (
            <ScrollView>
              {cartItems.map((item, index) => (
                <View style={styles.cartItem} key={index}>
                  <Text style={styles.cartItemName}>{item}</Text>
                  <TouchableOpacity onPress={() => removeItemFromCart(item)}>
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptyCart}>Seu carrinho está vazio</Text>
          )}
          <View style={styles.totalPrice}>
            <Text style={styles.totalPriceText}>Total: R$ {totalPrice.toFixed(2)}</Text>
            <Button title="Finalizar Compra" onPress={() => alert('Compra finalizada!')} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{ style: styles.tabBar }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }} />
        <Tab.Screen  name="Carrinho" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <MaterialIcons  name="shopping-cart" size={24} color={color} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffa500',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  itemButton: {
    backgroundColor: '#ffa500',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  itemButtonText: {
    color: 'white',
    fontSize: 14,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 50,
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  totalPriceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;
