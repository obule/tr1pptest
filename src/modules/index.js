import productRoutes from './products/route';
import receiptRoutes from './receipts/route';

export default app => {
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/receipts', receiptRoutes);
  app.use((err, req, res, next) => {
    if (err) {
      let appmessage;
      if (err.errors && err.errors[0].messages[0]) {
        appmessage = err.errors[0].messages[0];
      } else if (err.message) {
        appmessage = err.message;
      } else if (typeof err === 'string') {
        appmessage = err;
      } else {
        appmessage = 'Something went wrong';
      }
      res.status(400).json({ message: appmessage });
    } else {
      res.status(404).json({ message: 'Requested route not found' });
    }
  });
};
