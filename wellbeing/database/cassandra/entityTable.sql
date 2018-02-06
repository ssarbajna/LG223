use wellbeingKeyspace;

CREATE TABLE entityTable(
entityId int PRIMARY KEY,
entityDescr text,
created timestamp,
creator text
);

CREATE INDEX name ON entityTable(entityDescr);
