from app import db
from datetime import datetime

class Commit(db.Model):
	"""评论的模型"""
	id=db.Column(db.Integer,primary_key=True)
	committerID=db.Column(db.Integer,db.ForeignKey('usr.id'))
	content=db.Column(db.Text)
	articleID=db.Column(db.Integer,db.ForeignKey('article.id'))
	createTime=db.Column(db.DateTime)
	def __init__(self, committerID,content,articleID,createTime):
		self.committerID = committerID
		self.content=content
		self.articleID=articleID
		if createTime==None:
			self.createTime=datetime.utcnow()
		else:
			self.createTime=createTime

class Article(db.Model):
	id=db.Column(db.Integer,primary_key=True)
	title=db.Column(db.String(64))
	authorID=db.Column(db.Integer,db.ForeignKey('usr.id'))
	content=db.Column(db.Text)
	readTimes=db.Column(db.Integer)
	createTime=db.Column(db.DateTime)
	commits=db.relationship(Commit,backref='article',lazy='dynamic')
	def __init__(self,title,authorID,content,createTime):
		self.title=title
		self.authorID=authorID
		self.content=content
		self.readTimes=0
		if createTime==None:
			self.createTime=datetime.utcnow()
		else:
			self.createTime=createTime

class Usr(db.Model):
	id=db.Column(db.Integer,primary_key=True)
	name=db.Column(db.String(64),unique=True)
	password=db.Column(db.String(64))
	phoneNumber=db.Column(db.String(11),unique=True)
	sex=db.Column(db.Integer)
	email=db.Column(db.String(64),unique=True)
	registerTime=db.Column(db.DateTime)
	articles=db.relationship(Article,backref='ausr',lazy='dynamic')
	commits=db.relationship(Commit,backref='cusr',lazy='dynamic')
	def __init__(self,name,password,phoneNumber,sex,email,registerTime):
		self.name=name
		self.password=password
		self.phoneNumber=phoneNumber
		self.sex=sex
		self.email=email
		if registerTime==None:
			self.registerTime=datetime.utcnow()
		else:
			self.registerTime=registerTime



