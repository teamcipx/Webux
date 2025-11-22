import { 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  updateDoc,
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from "firebase/firestore";
import { db } from './firebase';
import { Order, OrderData, User, OrderStatus, PaymentStatus } from '../types';

export const createOrder = async (user: User, orderData: OrderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      
      planName: orderData.planName,
      planPrice: orderData.planPrice,
      domainName: orderData.domainName,
      requirements: orderData.requirements,
      
      totalAmount: orderData.totalAmount,
      paidAmount: orderData.paidAmount,
      dueAmount: orderData.totalAmount - orderData.paidAmount,
      paymentStatus: 'partial', // Assuming 50% paid on creation
      paymentMethod: orderData.paymentMethod,

      status: 'pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getOrders = async (userId: string, isAdmin: boolean = false): Promise<Order[]> => {
  try {
    let q;
    
    if (isAdmin) {
      // Admin fetches ALL orders
      q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    } else {
      // Regular user fetches ONLY their orders
      // Note: This composite query (userId + createdAt) requires a Firestore Index.
      // If it fails in console, follow the link provided by Firebase to create the index.
      q = query(
        collection(db, "orders"), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data
      });
    });
    return orders;
  } catch (e) {
    console.error("Error fetching orders: ", e);
    return [];
  }
};

export const updateOrderStatus = async (
  orderId: string, 
  updates: { 
    status?: OrderStatus, 
    paymentStatus?: PaymentStatus, 
    paidAmount?: number,
    dueAmount?: number,
    adminNotes?: string 
  }
) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, updates);
  } catch (e) {
    console.error("Error updating order: ", e);
    throw e;
  }
};