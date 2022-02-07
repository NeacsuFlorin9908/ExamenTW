const CrewMember = require('../models/crewMember');
const { Op } = require('sequelize');

const getCrewMembers = async(req,res)=>{
    try{
        const crewMembers = await CrewMember.findAll();
        return res.status(200).json(crewMembers);
    }catch(err){
        return res.status(500).json({message:"getAllCrewMembers error"})
    }
}

const addCrewMember = async(req,res)=>{
    try{
        const crewMember = await CrewMember.create(req.body);
        return res.status(201).json(crewMember);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"addCrewMember error"});
    }
}

const deleteCrewMember = async (req, res) => {
    try {
        const result = await CrewMember.destroy({
            where:{
                id: req.params.id
            }
        });

        if (result) {
            return res.status(200).json({success: true});
        }

        return res.status(500).json({error: true, message: "CrewMember does not exist"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: true, message: "deleteCrewMember error"});
    }
}

const updateCrewMember = async(req,res) => {
    try {
        const record = await CrewMember.findByPk(req.params.id);
        if (record) {
            await record.update(req.body);

            res.status(204).json({ success: true });
        } else {
            res.status(404).json({ error: true, message: "CrewMember not found" });
        }
    } catch(err){
        return res.status(500).json({message:"updateCrewMember error"});
    }
}

module.exports = {
    getCrewMembers,
    addCrewMember,
    deleteCrewMember,
    updateCrewMember
};