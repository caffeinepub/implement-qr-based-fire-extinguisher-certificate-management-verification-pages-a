import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type FireExtinguisherCertificateDto = {
    certificateNumber : ?Nat;
    uniqueToken : Text;
    clientName : Text;
    clientAddress : ?Text;
    extinguisherType : Text;
    capacity : Text;
    cylinderManufDate : Text;
    installationDate : Text;
    refillingDate : Text;
    nextDueDate : Text;
    refillingDoneBy : Text;
    testedBy : Text;
    certifiedBy : Text;
    refillingCompany : Text;
    remarks : ?Text;
    createdAt : Int;
    updatedAt : ?Int;
  };

  type OldActor = {
    inquiries : Map.Map<Int, { name : Text; company : ?Text; phone : Text; email : Text; serviceNeeded : Text; message : Text; timestamp : Int }>;
  };

  type NewActor = {
    inquiries : Map.Map<Int, { name : Text; company : ?Text; phone : Text; email : Text; serviceNeeded : Text; message : Text; timestamp : Int }>;
    certificates : Map.Map<Nat, FireExtinguisherCertificateDto>;
    tokenToCertNumber : Map.Map<Text, Nat>;
  };

  public func run(old : OldActor) : NewActor {
    let certificates = Map.empty<Nat, FireExtinguisherCertificateDto>();
    let tokenToCertNumber = Map.empty<Text, Nat>();
    { old with certificates; tokenToCertNumber };
  };
};
