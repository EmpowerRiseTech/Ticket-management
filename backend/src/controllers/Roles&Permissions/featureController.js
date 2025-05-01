import Feature from "../../models/Roles and Permissions/feature.js";


export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.findAll();
    res.status(200).json(features);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve features", error: err.message });
  }
};


export const createFeature = async (req, res) => {
  const { name, description, groupName } = req.body;
  try {
    const newFeature = await Feature.create({ name, description, groupName });
    res.status(201).json(newFeature);
  } catch (err) {
    res.status(400).json({ message: "Failed to create feature", error: err.message });
  }
};

export const mutipleFeatures = async (req,res) => {
  const { features } = req.body
  if(!Array.isArray(features) || features.length === 0 ){
    return res.status(400).json({
      sucess: false,
      message: "Invalid input. 'features' should be non-empty array"
    })
  }
  try {
    const createFeatures = await Feature.bulkCreate(features,{
      validate: true,
      individualHooks: true
    })
    res.status(201).json({ success: true,message: "Features created successfully.",data: createFeatures})
  } catch (error) {
    console.log(error,"eror")
    res.status(500).json({
      sucess: false,
      message : "An error accured while creating tickets",
      error: error?.message
    })
  }
}

export const updateFeature = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFeature = await Feature.update(req.body, { where: { id } });
    if (updatedFeature[0] === 0) {
      return res.status(404).json({ message: "Feature not found" });
    }
    res.status(200).json({ message: "Feature updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to update feature", error: err.message });
  }
};


export const deleteFeature = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Feature.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Feature not found" });
    }
    res.status(200).json({ message: "Feature deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete feature", error: err.message });
  }
};


export const seedDefaultFeatures = async (req, res) => {
  const defaultFeatures = [
    { name: "Dashboard", description: "Access to the main dashboard", groupName: "General" },
    { name: "User Management", description: "Manage users, roles, and permissions", groupName: "Admin" },
    { name: "Reports", description: "Access to view various reports", groupName: "Analytics" },
  ];

  try {
    for (const feature of defaultFeatures) {
      const [newFeature, created] = await Feature.findOrCreate({
        where: { name: feature.name },
        defaults: feature,
      });
      if (!created) {
        console.log(`Feature '${feature.name}' already exists.`);
      }
    }
    res.status(200).json({ message: "Default features seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to seed default features", error: err.message });
  }
};
