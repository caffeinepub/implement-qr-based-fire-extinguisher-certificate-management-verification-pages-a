import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type ContactInquiryDto = {
    name : Text;
    company : ?Text;
    phone : Text;
    email : Text;
    serviceNeeded : Text;
    message : Text;
    timestamp : Time.Time;
  };

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
    createdAt : Time.Time;
    updatedAt : ?Time.Time;
  };

  var certificateCounter = 1000 : Nat;

  let inquiries = Map.empty<Time.Time, ContactInquiryDto>();
  let certificates = Map.empty<Nat, FireExtinguisherCertificateDto>();
  let tokenToCertNumber = Map.empty<Text, Nat>();

  public shared ({ caller }) func upsertInquiry(name : Text, company : ?Text, phone : Text, email : Text, serviceNeeded : Text, message : Text) : async () {
    let timestamp = Time.now();
    let inquiry : ContactInquiryDto = {
      name;
      company;
      phone;
      email;
      serviceNeeded;
      message;
      timestamp;
    };
    inquiries.add(timestamp, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [ContactInquiryDto] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray();
  };

  public query ({ caller }) func getInquiryByTimestamp(timestamp : Time.Time) : async ContactInquiryDto {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    switch (inquiries.get(timestamp)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?inquiry) { inquiry };
    };
  };

  public query ({ caller }) func getInquiriesByName(name : Text) : async [ContactInquiryDto] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search inquiries");
    };
    inquiries.values().filter(func(inquiry) { inquiry.name == name }).toArray();
  };

  public query ({ caller }) func getInquiriesByService(service : Text) : async [ContactInquiryDto] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search inquiries");
    };
    inquiries.values().filter(func(inquiry) { inquiry.serviceNeeded == service }).toArray();
  };

  public shared ({ caller }) func createCertificate(
    clientName : Text,
    clientAddress : ?Text,
    extinguisherType : Text,
    capacity : Text,
    cylinderManufDate : Text,
    installationDate : Text,
    refillingDate : Text,
    nextDueDate : Text,
    refillingDoneBy : Text,
    testedBy : Text,
    certifiedBy : Text,
    refillingCompany : Text,
    remarks : ?Text,
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create certificates");
    };

    let certNumber = certificateCounter;
    certificateCounter += 1;

    let uniqueToken = generateUniqueToken(certNumber);

    let certificate : FireExtinguisherCertificateDto = {
      certificateNumber = ?certNumber;
      uniqueToken;
      clientName;
      clientAddress;
      extinguisherType;
      capacity;
      cylinderManufDate;
      installationDate;
      refillingDate;
      nextDueDate;
      refillingDoneBy;
      testedBy;
      certifiedBy;
      refillingCompany;
      remarks;
      createdAt = Time.now();
      updatedAt = null;
    };

    certificates.add(certNumber, certificate);
    tokenToCertNumber.add(uniqueToken, certNumber);

    certNumber;
  };

  public shared ({ caller }) func updateCertificate(
    certificateNumber : Nat,
    clientName : Text,
    clientAddress : ?Text,
    extinguisherType : Text,
    capacity : Text,
    cylinderManufDate : Text,
    installationDate : Text,
    refillingDate : Text,
    nextDueDate : Text,
    refillingDoneBy : Text,
    testedBy : Text,
    certifiedBy : Text,
    refillingCompany : Text,
    remarks : ?Text,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update certificates");
    };

    let existingCert = switch (certificates.get(certificateNumber)) {
      case (null) { Runtime.trap("Certificate not found") };
      case (?cert) { cert };
    };

    let updatedCert : FireExtinguisherCertificateDto = {
      existingCert with
      clientName;
      clientAddress;
      extinguisherType;
      capacity;
      cylinderManufDate;
      installationDate;
      refillingDate;
      nextDueDate;
      refillingDoneBy;
      testedBy;
      certifiedBy;
      refillingCompany;
      remarks;
      updatedAt = ?Time.now();
    };

    certificates.add(certificateNumber, updatedCert);
  };

  public query ({ caller }) func getCertificateByNumber(certificateNumber : Nat) : async ?FireExtinguisherCertificateDto {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access certificates by number");
    };
    certificates.get(certificateNumber);
  };

  public query ({ caller }) func getCertificateByToken(token : Text) : async ?FireExtinguisherCertificateDto {
    switch (tokenToCertNumber.get(token)) {
      case (null) { null };
      case (?certNumber) { certificates.get(certNumber) };
    };
  };

  public query ({ caller }) func getAllCertificates() : async [FireExtinguisherCertificateDto] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all certificates");
    };
    certificates.values().toArray();
  };

  public query ({ caller }) func getCertificatesByClientName(clientName : Text) : async [FireExtinguisherCertificateDto] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search certificates");
    };
    certificates.values().filter(func(cert) { Text.equal(cert.clientName, clientName) }).toArray();
  };

  func generateUniqueToken(certNumber : Nat) : Text {
    let timestamp = Time.now();
    let salt = "SAFE-IC-2024";
    certNumber.toText() # "-" # timestamp.toText() # "-" # salt;
  };
};
