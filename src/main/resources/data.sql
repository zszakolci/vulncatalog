INSERT INTO version (id) VALUES
('6.2.X EE'),
('7.0.X'),
('7.1.X'),
('7.2.X'),
('7.3.X'),
('master');

INSERT INTO vulnerability (id, url, description) VALUES
('CVE-2021-30468', 'https://nvd.nist.gov/vuln/detail/CVE-2021-30468', ''),
('CVE-2021-33813', 'https://nvd.nist.gov/vuln/detail/CVE-2021-33813', '');

INSERT INTO ticket (id, lpeId, lsvId, library) VALUES
('LPS-135892', 'LPE-17346', 'LSV-908', null),
('LPS-166489', 'LPE-17670', null, null),
('LPS-137136', 'LPE-17362', 'LSV-923', null),
('LPS-168194', 'LPE-17669', null, null);

INSERT INTO ticket_vulnerability (ticketId, vulnerabilityId) VALUES
('LPS-135892', 'CVE-2021-30468'),
('LPS-166489', 'CVE-2021-30468'),
('LPS-137136', 'CVE-2021-33813'),
('LPS-168194', 'CVE-2021-33813');

INSERT INTO ticket_affectedversion (ticketId, affectedVersion) VALUES
('LPS-135892', '7.3.X'),
('LPS-135892', 'master'),
('LPS-166489', '7.2.X'),
('LPS-166489', '7.1.X'),
('LPS-166489', '7.0.X'),
('LPS-166489', '6.2.X EE'),
('LPS-137136', 'master'),
('LPS-168194', '7.3.X'),
('LPS-168194', '7.2.X'),
('LPS-168194', '7.1.X'),
('LPS-168194', '7.0.X');

INSERT INTO ticket_fixedversion (ticketId, fixedVersion) VALUES
('LPS-135892', '7.3.X'),
('LPS-135892', 'master'),
('LPS-166489', '7.2.X'),
('LPS-166489', '7.1.X'),
('LPS-166489', '7.0.X'),
('LPS-166489', '6.2.X EE'),
('LPS-137136', 'master'),
('LPS-168194', '7.3.X'),
('LPS-168194', '7.2.X'),
('LPS-168194', '7.1.X'),
('LPS-168194', '7.0.X');