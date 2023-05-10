import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Icon } from 'react-native-elements';

const MENU = [
  {
    id: 1,
    name: 'Marmita 1',
    description: 'Deliciosa marmita com frango e arroz',
    price: 10.0,
    image: 'https://picsum.photos/id/1/200',
  },
  {
    id: 2,
    name: 'Marmita 2',
    description: 'Deliciosa marmita com carne e feijão',
    price: 12.5,
    image: 'https://picsum.photos/id/2/200',
  },
  {
    id: 3,
    name: 'Marmita 3',
    description: 'Deliciosa marmita com peixe e legumes',
    price: 15.0,
    image: 'https://picsum.photos/id/3/200',
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>
          Bom dia/Boa tarde/Boa noite
        </Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={MENU}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => addToCart(item)}
            >
              <View style={styles.menuItemImageContainer}>
                <Icon
                  name="food"
                  type="material"
                  color="#fff"
                  size={40}
                />
              </View>
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>
                  {item.description}
                </Text>
                <Text style={styles.menuItemPrice}>
                  R$ {item.price.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Icon name="close" type="material" color="#6e798c" size={30} />
          </TouchableOpacity>
          {cartItems.length > 0 ? (
            <View style={styles.cart}>
              <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item)}
                    >
                      <Icon
                        style={styles.cartItemRemoveIcon}
                        type="material"
                        name="remove"
                      />
                    </TouchableOpacity>
                    <Text style={styles.cartItemPrice}>
                      R$ {item.price.toFixed(2)}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <View style={styles.checkout}>
                <Text style={styles.checkoutTotal}>
                  Total: R${' '}
                  {cartItems.reduce(
                    (total, item) => total + item.price,
                    0
                  ).toFixed(2)}
                </Text>
                <TouchableOpacity style={styles.checkoutButton}>
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Carrinho vazio</Text>
            </View>
          )}
        </View>
      </Modal>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton} onPress={toggleModal}>
          <Icon name="shopping-cart" type="material" color="#fff" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton}>
          <Icon name="home" type="material" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    height: 70,
    backgroundColor: '#6e798c',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  navBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#6e798c',
    paddingVertical: 10,
    marginBottom: 10,
  },
  menuItemImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#6e798c',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  menuItemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  menuItemDescription: {
    color: '#6e798c',
    marginBottom: 5,
  },
  menuItemPrice: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomBar: {
    height: 60,
    backgroundColor: '#6e798c',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomBarButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cart: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
  },
  cartItemRemoveIcon: {
    marginLeft: 10,
  },
  cartItemPrice: {
    fontSize: 16,
  },
  checkout: {
    marginTop: 20,
  },
  checkoutTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // checkoutButton:
  checkoutButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
  emptyCart: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
  emptyCartText: {
  fontSize: 18,
  color: '#6e798c',
},
  modal: {
  flex: 1,
  backgroundColor: '#fff',
  marginTop: 250,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  padding: 20,
},
  modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
  modalHeaderText: {
  fontSize: 18,
  fontWeight: 'bold',
},
  modalCloseButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#6e798c',
  justifyContent: 'center',
  alignItems: 'center',
},
  modalCloseIcon: {
  color: '#fff',
},
  modalMenuItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  paddingBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
  modalMenuItemImageContainer: {
  width: 80,
  height: 80,
  backgroundColor: '#6e798c',
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
},
  modalMenuItemInfo: {
  flex: 1,
  paddingLeft: 10,
},
  modalMenuItemName: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 5,
},
  modalMenuItemDescription: {
  color: '#6e798c',
  marginBottom: 5,
},
  modalMenuItemPrice: {
  fontWeight: 'bold',
  fontSize: 18,
},
});

export default App;
