CREATE VIEW organism_view SELECT 
    organism.*,
    organism_type.name AS type_name,
    organism_family.name AS family_name,
    gram_stain_group.name AS gram_stain_group_name,
    organism_genus.name AS genus_name,
    organism_subfamily.name AS subfamily_name,
    genome_type.name AS genome_type_name    
FROM
    organism
        INNER JOIN
    organism_type ON organism.type_id = organism_type.id
        INNER JOIN
    organism_family ON organism.family_id = organism_family.id
		INNER JOIN
    gram_stain_group ON organism.gram_stain_group_id = gram_stain_group.id
    	INNER JOIN
    organism_genus ON organism.genus_id = organism_genus.id
    	INNER JOIN
    organism_subfamily ON organism.subfamily_id = organism_subfamily.id
    	INNER JOIN
    genome_type ON organism.genome_type_id = genome_type.id;