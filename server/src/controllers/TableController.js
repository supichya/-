const { Table } = require('../models')

module.exports = {
   
    async index(req, res) {
        try {
            const tables = await Table.findAll()
            res.send(tables)
        } catch (err) {
            res.status(500).send({
                error: 'The tables information was incorrect'
            })
        }
    },

   
    async create(req, res) {
        try {
            const table = await Table.create(req.body)
            res.send(table.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create tableincorrect'
            })
        }
    },

    async put(req, res) {
        try {
            await Table.update(req.body, {
                where: {
                    id: req.params.tableId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update table incorrect'
            })
        }
    },

 
    async remove(req, res) {
        try {
            const table = await Table.findOne({
                where: {
                    id: req.params.tableId
                }
            })

            if (!table) {
                return res.status(403).send({
                    error: 'The table information was incorrect'
                })
            }

            await table.destroy()
            res.send(table)
        } catch (err) {
            res.status(500).send({
                error: 'The table information was incorrect'
            })
        }
    },


  async show (req, res) {
    try {
      const table = await Table.findByPk(req.params.tableId)
      res.send(table)
    } 
    catch (err) {
        res.status(500).send({
            error: 'The table information was incorrect'
        })
    }
  }
}