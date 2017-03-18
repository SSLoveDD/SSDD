from app.models import Usr,Article,Commit
from app import db
usrs=[Usr('kk','123','18571933792',1,'kuangjq@outlook.com',None)
,Usr('ss','123','15042429129',1,'ss@sslovedd.com',None)
,Usr('testName','123','12345678901',1,'123@abc.com',None)
]
articles=[Article('title1',1,'this is content of article1',None)
,Article('title2',1,'this is content of article2',None)
,Article('title3',2,'this is content of article3',None)
]

commits=[Commit(1,'this is commit1',1,None)
,Commit(2,'this is commit1',1,None)
,Commit(3,'this is commit1',2,None)
]

data=[usrs,articles,commits]

for i in data:
	for record in i:
		db.session.add(record)

db.session.commit()