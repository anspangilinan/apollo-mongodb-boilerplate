import { NodeModel } from "../data/models/node";
import { Document } from "mongoose";

class NodeService {
  static async createDocument(data: any): Promise<Document | null> {
    try {
      const document = new NodeModel(data);
      await document.save();
      return document;
    } catch (error) {
      // Handle error or validation specific to your business logic
      throw error;
    }
  }

  static async getDocumentById(id: String): Promise<Document | null> {
    try {
      const document = await NodeModel.findById(id);
      if (!document) {
        throw new Error("Document not found");
      }
      return document;
    } catch (error) {
      // Handle error or validation specific to your business logic
      throw error;
    }
  }

  // Other methods for updating, deleting, and working with your data
}

export default NodeService;
