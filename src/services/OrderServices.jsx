import axios from "axios"

const API = import.meta.env.VITE_API_BASE_URL

// ✅ Create a new order
export const createOrder = async (orderData) => {
  const response = await axios.post(`${API}/api/orders`, orderData, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.data
}

// ✅ Get all orders (admin panel)
export const getAllOrders = async () => {
  const response = await axios.get(`${API}/api/orders/getall`)
  return response.data.orders || response.data
}

// ✅ Get single order by ID
export const getOrderById = async (id) => {
  const response = await axios.get(`${API}/api/orders/${id}`)
  return response.data.order || response.data
}

// ✅ Update order status/payment
export const updateOrder = async (id, updateData) => {
  const response = await axios.patch(`${API}/api/orders/${id}`, updateData, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.data
}

// ✅ Delete an order
export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API}/api/orders/${id}`)
  return response.data
}
