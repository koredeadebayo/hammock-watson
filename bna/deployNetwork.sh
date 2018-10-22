# set -ev
# VERSION=$(node -e 'console.log(require("hammock-watson@0.0.2.bna/package.json").version)')
# composer archive create --sourceName hammock-watson --sourceType module --archiveFile hammock-watson@0.0.2.bna
# composer network install --archiveFile ./hammock-watson@0.0.2.bna --card PeerAdmin@hlfv1
# composer network start --networkName hammock-watson --networkVersion ${VERSION} --card PeerAdmin@hlfv1 -A admin -S adminpw -l INFO
# composer card import --file ./admin@hammock-watson.card
# composer network list --card admin@hammock-watson

composer network install --card PeerAdmin@hlfv1 --archiveFile hammock-watson@0.0.2.bna
composer network start --networkName hammock-watson --networkVersion 0.0.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer network ping --card admin@hammock-watson