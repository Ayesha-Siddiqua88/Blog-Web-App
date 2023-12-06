import conf from '../conf/conf'
import {Client, Account, ID, Databases, Storage, Query} from 'appwrite'

export class Service{
    client=new Client();
    // variables
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases=new Databases(this.client);
            this.bucket=new Storage(this.client)
    }


// taking values from user on title...
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            // createDocument or post method
            // insted of document ID, we are using slug
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
                )
        }catch(error){
            console.log("Appwrite", error);
        }
    }



    // update post
    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf,appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        }catch(error){
            console.log("Appwrite update",error);
        }
    }



    // delete post
    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf,appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("Appwrite delet",error);
            return false
        }
    }



    // get document
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                comf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.log("Appwrite get",error);
            return false;
        }
    }



    // list posts whode status is active
    // getting all posts and applying queries
    // query can only be used if indexes are created in appwrite
    async getPosts(queries=[Query.equal("status","active")]){
        // listDocuments is a method to retrive posts with the query filter
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }catch(error){
            console.log("Appwrite get all posts",error);
            return false;
        }

    }



    // file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Appwrite file upload",error);
            return false;
        }
    }



    // delete file
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;

        }catch(error){
            console.log("Appwrite delete file",error);
            return false
        }
    }


    
    // file preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}



// export object
const service=new Service()
export default Service