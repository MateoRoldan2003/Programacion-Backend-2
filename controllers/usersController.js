exports.changeUserRole = async (req, res) => {
    const userId = req.params.uid;
    
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.role = user.role === 'user' ? 'premium' : 'user';
      await user.save();
  
      res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };  