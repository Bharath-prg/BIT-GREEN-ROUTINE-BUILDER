import EcoAction from "../models/EcoAction.js";
import User from "../models/User.js";

// Get all eco-actions (optionally filter by category)
export const getEcoActions = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const actions = await EcoAction.find(filter);
    res.json({ success: true, data: actions });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch eco-actions" });
  }
};

// Add a new eco-action (admin or user)
export const addEcoAction = async (req, res) => {
  try {
    const { title, category, description, impact, icon } = req.body;
    const action = new EcoAction({
      title,
      category,
      description,
      impact,
      icon,
      createdBy: req.user?.id || null,
    });
    await action.save();
    res.status(201).json({ success: true, data: action });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to add eco-action" });
  }
};

// Save/unsave an action for a user
export const toggleSaveEcoAction = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { actionId } = req.body;
    if (!user.savedActions) user.savedActions = [];
    const idx = user.savedActions.indexOf(actionId);
    if (idx === -1) {
      user.savedActions.push(actionId);
      await user.save();
      return res.json({ success: true, saved: true });
    } else {
      user.savedActions.splice(idx, 1);
      await user.save();
      return res.json({ success: true, saved: false });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update saved actions" });
  }
};

// Get user's saved actions
export const getSavedEcoActions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedActions");
    res.json({ success: true, data: user.savedActions || [] });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to fetch saved actions" });
  }
};
