import axios from 'axios';

const createPaymentIntent = async data => {
  try {
    const res = await axios.post('http://localhost:8080/payment-sheet', data);
    return res;
  } catch (error) {
    throw error;
  }
};

export default createPaymentIntent;
