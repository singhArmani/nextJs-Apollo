
const graphql = require('graphql');

// ref: https://github.com/apollographql/apollo-server/issues/1633
const ObjectId = require('mongodb').ObjectId;
ObjectId.prototype.valueOf = function () {
	return this.toString();
};


const linkType = new graphql.GraphQLObjectType({
    name: 'link',
    fields: () => ({
        _id: {
            type: graphql.GraphQLString
        },
        title: {
            type: graphql.GraphQLString
        },
        url: {
            type: graphql.GraphQLString
        }
    })
})
const Schema = db => {
    let store = {};
    const storeType = new graphql.GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            links: {
            type: new graphql.GraphQLList(linkType),
            resolve: () => db.collection('links').find({}).toArray()
            }
        })
    });

    return new graphql.GraphQLSchema({
        query: new graphql.GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            }) 
        })
    });
}

module.exports = Schema;